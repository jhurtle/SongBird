package com.songbird.dataPush;

import com.songbird.music.album.Album;
import com.songbird.music.album.AlbumService;
import com.songbird.music.artist.Artist;
import com.songbird.music.artist.ArtistService;
import com.songbird.music.song.Song;
import com.songbird.music.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/db")
public class DataPushController {

    @Autowired
    private ArtistService artistService;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private SongService songService;

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Artist addArtist(@RequestBody DataModel data) {
        Artist artist = new Artist();
        artist.setName(data.getName());
        artist.setArtSrc(data.getImageMed());
        //artist.setDescription(data.getBio().substring(0,Math.min(data.getBio().length(),250)));
        artist.setDescription(data.getBio().replace("/n","<br>/<br/>"));
        artist.setFollowers(data.getFollowers());
        artistService.addArtist(artist);
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println(artist.getName());
        System.out.println(artist.getId());
        System.out.println(artist.getFollowers());
        for(AlbumList albm : data.getAlbumList()){
            Album album= new Album();
            album.setName(albm.getSetName());
            album.setArtSrc(albm.getImageLarge());
            album.setArtist(artist);
            System.out.println("artistID: "+Integer.toString(artist.getId()));
            albumService.addAlbum(Integer.toString(artist.getId()),album);
            for(Track track: albm.getTracks()){
                Song song= new Song();
                song.setName(track.getName());
                song.setAudioSrc(track.getSrc());
                song.setTrackNumber(track.getTrackNum());
                song.setRuntime((double)track.getDuration()/1000);
                song.setAlbum(album);
                //song.setLyrics(track.getLyrics().substring(0,Math.min(track.getLyrics().length(),250)));
                song.setLyrics(track.getLyrics().replace("/n","<br>/<br/>"));
                songService.addSong(Integer.toString(album.getId()),song);
            }
        }
        System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        System.out.println(artist.getName());
        System.out.println(artist.getFollowers());
        System.out.println(artist.getId());
        return artistService.getArtist(artist.getId());
    }
}
