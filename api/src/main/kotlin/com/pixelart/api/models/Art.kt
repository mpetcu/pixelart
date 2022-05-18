package com.pixelart.api.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "art")
data class Art (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null,

    var content: HashMap<String, Any>,

    val created_at: LocalDateTime

)