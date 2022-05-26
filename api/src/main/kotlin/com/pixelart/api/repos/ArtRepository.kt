package com.pixelart.api.repos;

import com.pixelart.api.docs.Art
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import java.util.*

interface ArtRepository : MongoRepository<Art, ObjectId> {

    @Query("{'slug': ?0}")
    fun findBySlug(slug: String): Optional<Art>
}