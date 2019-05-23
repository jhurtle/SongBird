package com.songbird.music.playlist;

import com.songbird.music.album.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void addPlaylist(@RequestParam("userId") int userId, @RequestBody Playlist p){
        playlistService.addPlaylist(userId, p);
    }

    @RequestMapping(value = "{id}/remove", method = RequestMethod.POST)
    public void removePlaylist(@RequestParam("auth") String auth, @PathVariable("id") int id){
        playlistService.removePlaylist(auth, id);
    }

    @RequestMapping(value = "{id}/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updatePlaylist(@RequestBody Playlist p, @PathVariable("id") int id){
        playlistService.updatePlaylist(p, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Playlist getPlaylist(@PathVariable("id") int id){
        return playlistService.getPlaylist(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Iterable<Playlist> getAllPlaylists(){
        return playlistService.getAllPlaylists();
    }
}
