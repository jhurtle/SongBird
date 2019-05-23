package com.songbird.music.song;

import com.songbird.music.album.Album;
import com.songbird.music.album.AlbumService;
import com.songbird.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.awt.*;

@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    private SongService songService;
    private AlbumService albumService;


    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void addSong(@RequestParam("albumId") String albumId, @RequestBody Song s){
        songService.addSong(albumId, s);
    }

    @RequestMapping(value = "/addJ", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Album addSongJ(@RequestParam("file")MultipartFile file, @RequestParam("fileName")String fileName,
                         @RequestParam("songName")String songName, @RequestParam("lyrics")String lyrics,
                         @RequestParam("albumId")int albumId){
        return songService.addSongJ(file,fileName,songName,lyrics,albumId);
    }


    @RequestMapping(value = "{id}/addFeaturedArtist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void addFeaturedArtist(@PathVariable("id") int songId, @RequestParam("artistId") int artistId){
        songService.addFeaturedArtist(songId, artistId);
    }

    @RequestMapping(value = "{id}/privacy", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Album setPrivacy(@PathVariable("id") int songId){
        return songService.changePrivacy(songId);
    }

    @RequestMapping(value = "{id}/pendingA", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Album setPendingA(@PathVariable("id") int songId){
        return songService.setPendingJ(songId);
    }

    @RequestMapping(value = "{id}/renameJ", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Album renameSongJ(@PathVariable("id") int songId, @RequestBody String nameJson){
        return songService.renameSongJ(songId, nameJson);
    }

    @RequestMapping(value = "{id}/removeFeaturedArtist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void removeFeaturedArtist(@PathVariable("id") int songId, @RequestParam("artistId") int artistId){
        songService.removeFeaturedArtist(songId, artistId);
    }

    @RequestMapping(value = "{id}/remove", method = RequestMethod.POST)
    private void removeSong(@PathVariable("id") int id){
        songService.removeSong(id);
    }

    @RequestMapping(value = "{id}/removeJ", method = RequestMethod.POST)
    private Album removeSongJ(@PathVariable("id") int id){
        return songService.removeSong(id);
    }

    @RequestMapping(value = "{id}/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private void updateSong(@RequestBody Song s, @PathVariable("id") int id){
        songService.updateSong(s, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private SongModel getSong(@PathVariable("id") int id){
        return songService.getSongToPlay(id);
    }

    @RequestMapping(value="/inc/{id}",method=RequestMethod.GET)
    private void addPlays(@PathVariable("id") int id){
        songService.incrementPlays(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private Iterable<Song> getAllSongs(){
        return songService.getAllSongs();
    }
}
