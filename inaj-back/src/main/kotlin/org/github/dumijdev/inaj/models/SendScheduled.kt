package org.github.dumijdev.inaj.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*

@Document(collection = "sends")
class SendScheduled {
  @Id
  lateinit var id: UUID
  lateinit var name: String
  lateinit var document: Doc
  lateinit var content: String
  lateinit var periodicity: Periodicity
  lateinit var lastSentDate: LocalDateTime
  lateinit var sendDates: List<LocalDateTime>
  var status: SendScheduledStatus = SendScheduledStatus.INACTIVE

  enum class SendScheduledStatus(value: Boolean) {
    ACTIVE(true), INACTIVE(false)
  }

  enum class Periodicity(s: String) {
    DAILY("daily"), WEEKLY("weekly"), MONTHLY("monthly")
  }
}