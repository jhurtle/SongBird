package com.songbird.music.album;

import com.songbird.music.song.Song;
import com.songbird.music.song.SongModel;

import java.util.ArrayList;
import java.util.List;

public class AlbumModel {
    int id;
    String albumName;
    String artistName;
    int artistId;
    List<SongModel> tracks;
    String artSrc;
    String description;

    public AlbumModel(){

    }

    public String getArtSrc() {
        return artSrc;
    }

    public void setArtSrc(String artSrc) {
        this.artSrc = artSrc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public int getArtistId() {
        return artistId;
    }

    public void setArtistId(int artistId) {
        this.artistId = artistId;
    }

    public List<SongModel> getTracks() {
        return tracks;
    }

    public void setTracks(List<SongModel> tracks) {
        this.tracks = tracks;
    }

    public void addTrack(SongModel s){
       if(this.tracks==null){
           this.tracks=new ArrayList<SongModel>();
       }
       this.tracks.add(s);
    }
}
