package com.songbird.music.artist;

import com.songbird.music.album.Album;
import com.songbird.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_artist")
public class Artist {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "name")
    String name;

    @OneToMany(mappedBy = "artist",cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<Album> albums;

    @OneToMany(mappedBy="artist",cascade = CascadeType.REMOVE, orphanRemoval = true)
    List<Concert> concerts;

    @Column(name = "description",columnDefinition = "TEXT")
    String description;

    @Column(name = "art_src")
    String artSrc;

    @Column(name = "followers")
    int followers;

    @OneToOne
    User user;


    public Artist() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArtSrc() {
        return artSrc;
    }

    public void setArtSrc(String artSrc) {
        this.artSrc = artSrc;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
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

    public List<Concert> getConcerts() {
        return concerts;
    }

    public void setConcerts(List<Concert> concerts) {
        this.concerts = concerts;
    }

    public void addAlbum(Album a){
        System.out.println("in Artist.addAlbum");
        System.out.println(a.getArtist().getName());
        System.out.println(a.getName());
        if(albums==null){
            albums= new ArrayList<Album>();
        }
        albums.add(a);
        if(albums.contains(a)){
            System.out.println("its added");
        }
        else{
            System.out.println("not added");
        }
    }

    public void addConcert(Concert concert){
        if(concerts==null){
            concerts = new ArrayList<Concert>();
        }
        concerts.add(concert);
    }
}
