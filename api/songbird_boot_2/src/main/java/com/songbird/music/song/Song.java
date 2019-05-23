package com.songbird.music.song;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.songbird.music.album.Album;
import com.songbird.music.artist.Artist;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "t_song")
public class Song {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @Id
    int id;

    @Column(name = "name")
    String name;

    @Column(name = "runtime")
    double runtime;

    @JsonIgnoreProperties(value = {"artSrc", "songs"})
    @ManyToOne
    Album album;

    @JsonIgnoreProperties(value = {"albums"})
    @OneToMany(cascade = CascadeType.ALL)
    List<Artist> featuredArtists=null;

    @ElementCollection(targetClass = Integer.class)
    @Column(name = "genres")
    List<Integer> genres=null;

    @Column(name = "track_number")
    int trackNumber;

    @Column(name = "audio_src")
    String audioSrc;

    @Column(name = "rating")
    double rating;

    @Column(name = "lyrics", length=1000)
    String lyrics;

    @Column(name = "plays")
    int plays;

    @Column(name="privacy")
    int privacy = 1;

    @Column(name="pending")
    int pending = 1;

    public Song() {

    }

    public int getPrivacy() {
        return privacy;
    }

    public void setPrivacy(int privacy) {
        this.privacy = privacy;
    }

    public void addFeaturedArtist(Artist a){
        featuredArtists.add(a);
    }

    public void removeFeaturedArtist(Artist a){
        featuredArtists.remove(a);
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
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

    public double getRuntime() {
        return runtime;
    }

    public void setRuntime(double runtime) {
        this.runtime = runtime;
    }

    public List<Artist> getFeaturedArtists() {
        return featuredArtists;
    }

    public void setFeaturedArtists(List<Artist> featuredArtists) {
        this.featuredArtists = featuredArtists;
    }

    public List<Integer> getGenres() {
        return genres;
    }

    public void setGenres(List<Integer> genres) {
        this.genres = genres;
    }

    public int getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(int trackNumber) {
        this.trackNumber = trackNumber;
    }

    public String getAudioSrc() {
        return audioSrc;
    }

    public void setAudioSrc(String audioSrc) {
        this.audioSrc = audioSrc;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public int getPlays() {
        return plays;
    }

    public void setPlays(int plays) {
        this.plays = plays;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }
}
