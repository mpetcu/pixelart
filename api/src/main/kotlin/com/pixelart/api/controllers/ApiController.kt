package com.pixelart.api.controllers

import com.pixelart.api.models.Art
import com.pixelart.api.repos.ArtRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api")
class ApiController {

    @Autowired
    lateinit var artRepository : ArtRepository

    @RequestMapping("/list", method = [RequestMethod.GET])
    fun list(): List<Art> {
        return artRepository.findAll()
    }

    @RequestMapping("/add", method = [RequestMethod.PUT])
    fun add(
        @RequestBody content: HashMap<String, Any>
    ): Boolean  {
        val art = Art(null, content , LocalDateTime.now())
        artRepository.save(art)
        return true
    }

    @RequestMapping("/update", method = [RequestMethod.PUT])
    fun update(
        @RequestParam id: Int,
        @RequestBody content: HashMap<String, Any>
    ): Boolean {
        val artOptional = artRepository.findById(id)
        if(artOptional.isPresent){
            var art: Art = artOptional.get()
                art.content = content
            artRepository.save(art)
            return true
        }
        return false
    }

    @RequestMapping("/del", method = [RequestMethod.DELETE])
    fun del(
        @RequestParam id: Int
    ): Boolean {
        artRepository.deleteById(id)
        return true
    }






}