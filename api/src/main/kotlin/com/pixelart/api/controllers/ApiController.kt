package com.pixelart.api.controllers

import com.pixelart.api.config.toSlug
import com.pixelart.api.docs.Art
import com.pixelart.api.repos.ArtRepository
import com.pixelart.api.services.ImageService
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
class ApiController (val imageService: ImageService) {

    @Autowired
    lateinit var artRepository : ArtRepository

    @RequestMapping("/list", method = [RequestMethod.GET])
    fun list(): List<Art> {
        val all: List<Art> = artRepository.findAll()

        //generate images if not exist
        for(img in all){
            imageService.generateImageIfNotExist(img);
        }
        return all
    }

    @RequestMapping("/get", method = [RequestMethod.GET])
    fun get(
        @RequestParam slug: String
    ): Art? {
        val art = artRepository.findBySlug(slug)
        if(art.isPresent){
            return art.get()
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @RequestMapping("/add", method = [RequestMethod.POST])
    fun add(
        @RequestBody content: HashMap<String, Any>
    ): Art?  {
        var title = "Untitled"
        var tags = "pixelart"
        val id = ObjectId()

        if(content.containsKey("title")){
           title = content["title"] as String
        }
        if(content.containsKey("tags")){
            tags = content["tags"] as String
        }
        val slug = (title+' '+id.toHexString()).toSlug()

        val art = Art(id, title, slug, tags, content)

        //regenerate image
        imageService.refreshImage(art)

        return artRepository.save(art)
    }

    @RequestMapping("/update", method = [RequestMethod.PUT])
    fun update(
        @RequestParam slug: String,
        @RequestBody content: HashMap<String, Any>
    ): Art? {
        val artOptional = artRepository.findBySlug(slug)
        if(artOptional.isPresent){
            val art: Art = artOptional.get()
                art.content = content
            artRepository.save(art)

            //regenerate image
            imageService.refreshImage(art)

            return art
        }
        return null
    }

    @RequestMapping("/del", method = [RequestMethod.DELETE])
    fun del(
        @RequestParam id: String
    ): Boolean {
        artRepository.deleteById(ObjectId(id))
        return true
    }






}