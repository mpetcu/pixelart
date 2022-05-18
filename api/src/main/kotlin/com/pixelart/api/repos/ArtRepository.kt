package com.pixelart.api.repos;

import com.pixelart.api.models.Art
import org.springframework.data.jpa.repository.JpaRepository

interface ArtRepository : JpaRepository<Art, Int> {

}