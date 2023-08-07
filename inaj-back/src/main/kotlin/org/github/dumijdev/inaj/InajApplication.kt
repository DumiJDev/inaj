package org.github.dumijdev.inaj

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class InajApplication

fun main(args: Array<String>) {
	runApplication<InajApplication>(*args)
}
