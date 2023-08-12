package org.github.dumijdev.inaj.utils

import java.security.Key
import java.security.MessageDigest
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec

class TokenUtils(private val secretKey: Key) {

  private val cipher: Cipher = Cipher.getInstance("AES/GCM/NoPadding")

  fun generateSecureToken(data: String, strength: Int = 1): String {
    var token = data
    repeat(strength) {
      token = internalGenerateSecureToken(token)
    }
    return token
  }

  fun detokenizeSecureToken(token: String, strength: Int = 1): String {
    var detokenizedData = token
    repeat(strength) {
      detokenizedData = internalDetokenizeSecureToken(detokenizedData)
    }
    return detokenizedData
  }

  private fun internalGenerateSecureToken(data: String): String {
    val iv = ByteArray(12)
    SecureRandom().nextBytes(iv)

    cipher.init(Cipher.ENCRYPT_MODE, secretKey, GCMParameterSpec(128, iv))
    val encryptedBytes = cipher.doFinal(data.toByteArray())
    val ivHex = iv.joinToString("") { String.format("%02X", it) }
    val encryptedHex = encryptedBytes.joinToString("") { String.format("%02X", it) }
    return ivHex + encryptedHex
  }

  private fun internalDetokenizeSecureToken(token: String): String {
    val ivHex = token.substring(0, 24)
    val encryptedHex = token.substring(24)

    val iv = ivHex.chunked(2).map { it.toInt(16).toByte() }.toByteArray()
    val encryptedBytes = encryptedHex.chunked(2).map { it.toInt(16).toByte() }.toByteArray()

    cipher.init(Cipher.DECRYPT_MODE, secretKey, GCMParameterSpec(128, iv))
    val decryptedBytes = cipher.doFinal(encryptedBytes)
    return String(decryptedBytes)
  }
}

fun generateFixedKeyFromPassword(password: String): Key {
  val sha256 = MessageDigest.getInstance("SHA-256")
  val hashBytes = sha256.digest(password.toByteArray())
  return SecretKeySpec(hashBytes, "AES")
}

fun main() {
  val secretKey = generateFixedKeyFromPassword("Dumij")

  val secureTokenGenerator = TokenUtils(secretKey)

  val originalData = "Dumildes é um grande dev"

  val token = secureTokenGenerator.generateSecureToken(originalData, strength = 2)
  println("Generated Secure Token: $token")

  val detokenizedData = secureTokenGenerator.detokenizeSecureToken(token, strength = 2)
  println("Detokenized Secure Data: $detokenizedData")
}
