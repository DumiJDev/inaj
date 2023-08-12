package org.github.dumijdev.inaj.service

import org.github.dumijdev.inaj.models.Doc
import org.github.dumijdev.inaj.repository.UserRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.util.*

@Service
class DocServiceImpl(private val repository: UserRepository) : DocService {

  override fun appendDoc(userId: UUID, doc: Doc): Mono<Doc> {
    TODO("Not yet implemented")
  }

  override fun updateDoc(docId: UUID, doc: Doc): Mono<Doc?> {
    TODO("Not yet implemented")
  }

  override fun removeDoc(docId: UUID) {
    TODO("Not yet implemented")
  }
}