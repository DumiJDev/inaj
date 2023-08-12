package org.github.dumijdev.inaj.controller

import org.github.dumijdev.inaj.exception.ResourceNotFoundException
import org.github.dumijdev.inaj.models.User
import org.github.dumijdev.inaj.service.UserService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.Mono.fromCallable
import java.util.*
import javax.validation.Valid

@RequestMapping("/api/v1/users")
@RestController
class UserController(private val service: UserService) {

  private fun <T> handleError(exception: Throwable, status: HttpStatus, body: T? = null): Mono<ResponseEntity<T>> {
    return Mono.just(ResponseEntity.status(status).body(body))
  }

  @PostMapping
  fun postUser(@Valid @RequestBody user: User): Mono<ResponseEntity<User>> {
    return service.save(user)
      .map { ResponseEntity.status(HttpStatus.CREATED).body(it) }
      .onErrorResume { handleError(it, HttpStatus.BAD_REQUEST) }
  }

  @GetMapping
  fun getMany(@PageableDefault(size = 25, page = 0) page: Pageable): ResponseEntity<Flux<User>> {
    return ResponseEntity.ok(service.getMany(page))
  }

  @GetMapping("/{userId}")
  fun getOne(@PathVariable("userId") userId: UUID): Mono<ResponseEntity<User>> {
    return service.getOne(userId)
      .map { ResponseEntity.ok(it) }
      .onErrorResume(ResourceNotFoundException::class.java) { handleError(it, HttpStatus.NOT_FOUND) }
  }

  @PutMapping("/{userId}")
  fun updateOne(@RequestBody user: User, @PathVariable("userId") userId: UUID): Mono<ResponseEntity<User>> {
    return service.update(user, userId)
      .map { ResponseEntity.ok(it) }
      .onErrorResume(ResourceNotFoundException::class.java) { handleError(it, HttpStatus.NOT_FOUND) }
      .onErrorResume(IllegalArgumentException::class.java) { handleError(it, HttpStatus.BAD_REQUEST) }
  }

  @DeleteMapping("/{userId}")
  fun deleteOne(@PathVariable("userId") userId: UUID): Mono<ResponseEntity<String>> {
    return service.deleteOne(userId)
      .map { ResponseEntity.ok("deleted, id=$userId") }
      .onErrorResume(ResourceNotFoundException::class.java) { handleError(it, HttpStatus.NOT_FOUND, it.message) }
  }
}
