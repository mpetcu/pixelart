package com.pixelart.api.docs

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import javax.persistence.Id

@Document
data class Art (

    @Id
    @JsonSerialize(using = ToStringSerializer::class)
    val id: ObjectId,
    var title: String,
    @Indexed(unique=true)
    var slug: String, //composed from title and id
    var tags: String,
    var content: HashMap<String, Any>,
    val created_at: LocalDateTime = LocalDateTime.now()
)