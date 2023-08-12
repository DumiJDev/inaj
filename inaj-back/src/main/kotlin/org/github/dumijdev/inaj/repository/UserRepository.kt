package org.github.dumijdev.inaj.repository

import org.github.dumijdev.inaj.models.User
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Repository
interface UserRepository : ReactiveMongoRepository<User, UUID> {
  fun existsByUsername(username: String): Mono<Boolean>

  fun findAllBy(pageable: Pageable): Flux<User>
}