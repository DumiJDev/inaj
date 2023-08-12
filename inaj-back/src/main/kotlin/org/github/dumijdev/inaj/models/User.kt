package org.github.dumijdev.inaj.models

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@JsonInclude(JsonInclude.Include.NON_NULL, content = JsonInclude.Include.NON_EMPTY)
@Document(collection = "users")
class User {
  @Id
  var id: UUID = UUID.randomUUID()
  @NotBlank
  @NotEmpty
  var name: String? = null
  @NotBlank
  @NotEmpty
  var username: String? = null
  @NotBlank
  @NotEmpty
  var password: String? = null
  @NotBlank
  @NotEmpty
  @Email
  var email: String? = null
  var isActive: Boolean = false
  var createdAt: LocalDateTime? = null
  var documents: List<Doc>? = null
  var sends: List<SendScheduled>? = null

  override fun toString(): String {
    return "User(id=$id, name='$name', username='$username', password='$password', email='$email', documents=$documents, sends=$sends)"
  }


}