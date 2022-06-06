package com.pixelart.api.services

import com.pixelart.api.docs.Art
import org.springframework.stereotype.Service
import java.awt.AlphaComposite
import java.awt.Color
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO

@Service
class ImageService {

    fun generateImage(art: Art, file: File){
        try {

            val max = 800
            val layoutSize: Map<String, String> = art.content["layoutSize"] as Map<String, String>
            val layoutSizeW: Int = layoutSize["w"] as Int
            val layoutSizeH: Int = layoutSize["h"] as Int
            var cel = max / layoutSizeW
            if (cel > max / layoutSizeH) {
                cel = max / layoutSizeH
            }
            val w = cel * layoutSizeW
            val h = cel * layoutSizeH

            var bufferImg = BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
            var g2d = bufferImg.createGraphics();

            g2d.setComposite(AlphaComposite.Clear);
            g2d.fillRect(0, 0, w, h);
            g2d.setComposite(AlphaComposite.Src);

            art.content["grid"]

//        //backgound
//        g2d.setColor(Color.decode("#FFFFFF"));
//        g2d.fillRect(0, 0, w, h);

            for ((key, color) in art.content["grid"] as Map<String, String>) {
                val splited = key.split('_');
                if(color.length == 7) {
                    g2d.setColor(Color.decode(color));
                    g2d.fillRect(
                        splited[1].toInt() * cel - cel,
                        splited[0].toInt() * cel - cel,
                        cel,
                        cel
                    );
                }
            }

            g2d.dispose();
            ImageIO.write(bufferImg, "png", file);

        }catch (e: Exception){
            println(e.message)
        }
    }

    fun getFile(slug: String) : File{
        val location = "client/public/artpic/"
        val filename = slug+".png"
        return File(location + filename)
    }

    fun generateImageIfNotExist(art: Art){
        val file = getFile(art.slug)
        if(!file.exists()){
            generateImage(art, file)
        }
    }

    fun refreshImage(art: Art){
        val file = getFile(art.slug)
        generateImage(art, file)
    }
}