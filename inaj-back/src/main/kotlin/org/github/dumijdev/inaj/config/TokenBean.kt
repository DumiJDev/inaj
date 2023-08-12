package org.github.dumijdev.inaj.config

import org.github.dumijdev.inaj.utils.TokenUtils
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.security.Key
import java.security.MessageDigest
import javax.crypto.spec.SecretKeySpec

@Configuration
class TokenBean {

  @Bean
  fun secureToken(): TokenUtils {
    return TokenUtils(generateFixedKeyFromPassword("XXX-XXX-XXX.XXX.XXX.XXX"))
  }

  private fun generateFixedKeyFromPassword(password: String): Key {
    val sha256 = MessageDigest.getInstance("SHA-256")
    val hashBytes = sha256.digest(password.toByteArray())
    return SecretKeySpec(hashBytes, "AES")
  }
}