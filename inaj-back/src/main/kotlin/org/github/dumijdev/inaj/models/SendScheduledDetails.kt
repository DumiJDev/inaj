package org.github.dumijdev.inaj.models

import java.time.LocalDateTime

class SendScheduledDetails {
  val date: LocalDateTime = LocalDateTime.now()
  lateinit var status: SendScheduledStatus

  enum class SendScheduledStatus(value: String) {
    SUCCESS("success"), FAILED("failed")
  }
}