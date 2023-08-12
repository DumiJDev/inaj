package org.github.dumijdev.inaj.service

import org.github.dumijdev.inaj.models.User
import org.springframework.data.domain.Pageable
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface UserService {
  fun save(user: User): Mono<User>
  fun getOne(userId: UUID): Mono<User?>
  fun getMany(page: Pageable): Flux<User>
  fun update(user: User, userId: UUID): Mono<User?>
  fun enableOrDisableAccount(userId: UUID): Mono<User?>
  fun validateAccount(token: String): Mono<User?>
  fun deleteOne(userId: UUID): Mono<Any>
}