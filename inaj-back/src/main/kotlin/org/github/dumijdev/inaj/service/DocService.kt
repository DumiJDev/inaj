package org.github.dumijdev.inaj.service

import org.github.dumijdev.inaj.models.Doc
import reactor.core.publisher.Mono
import java.util.UUID

interface DocService {
  fun appendDoc(userId: UUID, doc: Doc): Mono<Doc>
  fun updateDoc(docId: UUID, doc: Doc): Mono<Doc?>
  fun removeDoc(docId: UUID)
}
