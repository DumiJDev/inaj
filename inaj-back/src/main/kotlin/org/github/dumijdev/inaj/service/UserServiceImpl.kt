package org.github.dumijdev.inaj.service

import org.github.dumijdev.inaj.exception.ResourceNotFoundException
import org.github.dumijdev.inaj.models.User
import org.github.dumijdev.inaj.repository.UserRepository
import org.github.dumijdev.inaj.utils.TokenUtils
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.util.*
import java.util.logging.Logger

@Service
class UserServiceImpl(
  private val repository: UserRepository,
  private val reactiveMongoTemplate: ReactiveMongoTemplate,
  private val tokenUtils: TokenUtils
) : UserService {

  val log: Logger = Logger.getLogger("user_service")

  override fun save(user: User): Mono<User> {
    return existsByUsername(user)
      .flatMap { exists ->
        if (exists) {
          Mono.error(IllegalArgumentException("Username already exists"))
        } else {
          val updatedUser = user.apply {
            if (createdAt == null) createdAt = LocalDateTime.now()
            username = "@$username"
          }
          repository.save(updatedUser)
        }
      }
  }

  override fun getOne(userId: UUID): Mono<User?> {
    return repository.findById(userId)
      .switchIfEmpty(
        Mono.error(ResourceNotFoundException(userId.toString()))
      )
  }

  override fun getMany(page: Pageable): Flux<User> {
    return repository.findAllBy(page)
  }

  override fun update(user: User, userId: UUID): Mono<User?> {
    return repository.findById(userId)
      .switchIfEmpty(Mono.error(ResourceNotFoundException(userId.toString())))
      .flatMap { existingUser ->
        if (userId != user.id) {
          Mono.error(IllegalArgumentException("User IDs are not equal"))
        } else {
          existingUser.apply {
            email?.let { if (it != user.email) email = user.email }
            name?.let { if (it != user.name) name = user.name }
          }
          repository.save(existingUser)
        }
      }
  }

  override fun enableOrDisableAccount(userId: UUID): Mono<User?> {
    return repository.findById(userId)
      .switchIfEmpty(Mono.error(ResourceNotFoundException(userId.toString())))
      .map { user ->
        user.apply { isActive = !isActive }
      }
      .flatMap { updatedUser ->
        repository.save(updatedUser)
      }
  }

  override fun validateAccount(token: String): Mono<User?> {
    return Mono.empty()
  }

  override fun deleteOne(userId: UUID): Mono<Any> {
    return repository.existsById(userId)
      .switchIfEmpty(Mono.error(ResourceNotFoundException(userId.toString())))
      .flatMap { repository.deleteById(userId) }
  }

  private fun existsByUsername(user: User): Mono<Boolean> {
    val query = Query(Criteria.where("username").`is`("@${user.username}"))
    return reactiveMongoTemplate.exists(query, User::class.java)
  }
}