package com.songbird.music.album;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.songbird.music.artist.Artist;
import com.songbird.music.song.Song;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_album")
public class Album {

    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    int id;

    @Column(name = "name")
    String name;

    @ManyToOne()
    @JsonIgnoreProperties(value = {"albums"})
    Artist artist;

    /*
    @JsonIgnore
    @OneToMany
    List<Artist> featuredArtists;
    */

    //@JoinColumn(name = "t_featured_artists")
    //@Column(name = "t_featured_artists")
    //@ElementCollection(targetClass = Artist.class)

    @OneToMany(mappedBy = "album", cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<Song> songs=null;

    @Column(name = "art_src")
    String artSrc;

    @Column(name = "albumDescription",columnDefinition="TEXT")
    String description;

    public Album() {
    }

    public void addSong(Song s){
        if(songs==null){
            songs=new ArrayList<Song>();
        }
        songs.add(s);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public String getArtSrc() {
        return artSrc;
    }

    public void setArtSrc(String artSrc) {
        this.artSrc = artSrc;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }
}
