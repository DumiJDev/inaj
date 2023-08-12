package org.github.dumijdev.inaj.models

import java.time.LocalDateTime

class Doc {
  lateinit var name: String
  lateinit var encodedContent: String
  lateinit var uploadDate: LocalDateTime
  lateinit var lastUpdateDate: LocalDateTime
}