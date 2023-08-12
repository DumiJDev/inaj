package org.github.dumijdev.inaj.exception

class ResourceNotFoundException(id: String) : RuntimeException("Resource not found with id=$id")
