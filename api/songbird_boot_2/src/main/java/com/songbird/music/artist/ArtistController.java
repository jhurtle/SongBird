package com.songbird.music.artist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/artist")
public class ArtistController {

    @Autowired
    public ArtistService artistService;

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public Artist getArtistByUserId(@PathVariable("id") int id){
        return artistService.getArtistByUserId(id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Artist addArtist(@RequestBody Artist a)
    {
        return artistService.addArtist(a);
    }

    @RequestMapping(value = "{id}/renameJ", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Artist renameArtist(@PathVariable("id") int id, @RequestBody String nameJson){
        return artistService.renameArtist(id, nameJson);
    }

    @RequestMapping(value = "{id}/addConcertJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist addConcertJ(@PathVariable("id")int artistId, @RequestParam("date")String date,
                                @RequestParam("time")String time, @RequestParam("address")String address,
                                @RequestParam("description")String description){
        return artistService.addConcertJ(artistId,date,time,address,description);
    }
    @RequestMapping(value = "{id}/removeConcertJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist removeConcertJ(@PathVariable("artistId")int artistId,@RequestParam("concertId")int concertId){
        return artistService.removeConcertJ(artistId,concertId);
    }

    @RequestMapping(value = "{id}/updateConcertJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist updateConcertJ(@PathVariable("id")int artistId, @RequestParam("date")String date,
                             @RequestParam("time")String time, @RequestParam("address")String address,
                             @RequestParam("description")String description,
                                @RequestParam("concertId")int concertId){
        return artistService.updateConcertJ(artistId,concertId,date,time,address,description);
    }

    @RequestMapping(value = "/profileJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist changeProfile(@RequestParam("file")MultipartFile file, @RequestParam("artistId")int artistId,
                              @RequestParam("fileName")String fileName){
        return artistService.changeProfileJ(file,artistId,fileName);
    }

    @RequestMapping(value = "{id}/bioJ", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Artist updateBioJ(@PathVariable("id") int id, @RequestBody String bioJson){
        return artistService.updateBioJ(id, bioJson);
    }

    @RequestMapping(value = "{id}/remove", method = RequestMethod.POST)
    public void removeArtist(@RequestParam("auth") String auth, @PathVariable("id") int id){
        artistService.removeArtist(auth, id);
    }

    @RequestMapping(value = "{id}/removeA", method = RequestMethod.POST)
    public Iterable<Artist> removeArtistA(@RequestParam("auth") String auth, @PathVariable("id") int id){
        artistService.removeArtist(auth, id);
        return artistService.getAllArtists();
    }

    @RequestMapping(value = "{id}/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateArtist(@RequestBody Artist a, @PathVariable("id") int id){
        artistService.updateArtist(a, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Artist getArtist(@PathVariable("id") int id){
        return artistService.getArtist(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Iterable<Artist> getAllArtists(){
        return artistService.getAllArtists();
    }

}
