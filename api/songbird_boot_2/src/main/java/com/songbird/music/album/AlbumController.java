package com.songbird.music.album;

import com.songbird.music.artist.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/album")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void addAlbum(@RequestParam("artistId") String artistId, @RequestBody Album a){
        albumService.addAlbum(artistId, a);
    }

    @RequestMapping(value = "{id}/remove", method = RequestMethod.POST)
    private Iterable<Album> removeAlbum(@RequestParam("auth") String auth, @PathVariable("id") int id){
        albumService.removeAlbum(auth, id);
        return albumService.getAllArtists();
    }
    @RequestMapping(value = "/updateJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist updateAlbumJ(@RequestParam("file")MultipartFile file, @RequestParam("fileName")String fileName,
                               @RequestParam("albumName")String albumName, @RequestParam("albumId")int albumId){
        return albumService.updateJ(file,fileName,albumName,albumId);
    }
    @RequestMapping(value = "/createJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Artist createAlbumJ(@RequestParam("file")MultipartFile file, @RequestParam("fileName")String fileName,
                               @RequestParam("albumName")String albumName, @RequestParam("artistId")int artistId){
        return albumService.createJ(file,fileName,albumName,artistId);
    }
    @RequestMapping(value = "/createA", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Iterable<Album> createAlbumA(@RequestParam("file")MultipartFile file, @RequestParam("fileName")String fileName,
                               @RequestParam("albumName")String albumName, @RequestParam("artistId")int artistId){
        albumService.createJ(file,fileName,albumName,artistId);
        return getAllArtists();
    }
    @RequestMapping(value = "{id}/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private void updateAlbum(@RequestBody Album a, @PathVariable("id") int id){
        albumService.updateAlbum(a, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private Album getAlbum(@PathVariable("id") int id){
        return albumService.getAlbum(id);
    }

    @RequestMapping(value = "/play/{id}", method = RequestMethod.GET)
    private AlbumModel getAlbumToPlay(@PathVariable("id") int id){
        return albumService.getAlbumToPlay(id);
    }

    @CrossOrigin(origins  = "http://localhost:8000")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    private Iterable<Album> getAllArtists(){
        return albumService.getAllArtists();
    }
}
