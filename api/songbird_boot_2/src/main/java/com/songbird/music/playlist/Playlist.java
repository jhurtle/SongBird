package com.songbird.music.playlist;

import com.songbird.music.song.Song;
import com.songbird.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "t_playlist")
public class Playlist {

    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    int id;

    @Column(name = "name")
    String name;

    @OneToOne
    User owner;

    @OneToMany(cascade = CascadeType.ALL)
    List<User> contributers=null;

    @OneToMany
    List<Song> songs=null;

    @Column(name = "description")
    String description;

    @Column(name = "public_playlist")
    Boolean publicPlaylist;

    @Column(name = "followers")
    int followers;

    public Playlist() {
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<User> getContributers() {
        return contributers;
    }

    public void setContributers(List<User> contributers) {
        this.contributers = contributers;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPublicPlaylist() {
        return publicPlaylist;
    }

    public void setPublicPlaylist(Boolean publicPlaylist) {
        this.publicPlaylist = publicPlaylist;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }
}
