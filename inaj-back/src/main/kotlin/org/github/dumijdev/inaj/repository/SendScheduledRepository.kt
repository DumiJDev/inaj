package org.github.dumijdev.inaj.repository

import org.github.dumijdev.inaj.models.SendScheduled
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SendScheduledRepository : ReactiveMongoRepository<SendScheduled, UUID> {

}