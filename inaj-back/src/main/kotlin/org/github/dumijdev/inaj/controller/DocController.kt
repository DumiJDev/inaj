package org.github.dumijdev.inaj.controller

import org.github.dumijdev.inaj.service.DocService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/v1/docs")
@RestController
class DocController(private val service: DocService) {
}