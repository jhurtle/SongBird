package com.songbird.music.artist;

import com.songbird.music.album.AlbumModel;
import com.songbird.user.UserModel;

import java.util.ArrayList;
import java.util.List;

public class ArtistModel {
    int id;
    String name;
    List<AlbumModel> albums;
    String description;
    String artSrc;
    int followers;
    int userId;
    String UserName;

    public ArtistModel() {
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

    public List<AlbumModel> getAlbums() {
        return albums;
    }

    public void setAlbums(List<AlbumModel> albums) {
        if(this.albums==null){
            this.albums=new ArrayList<AlbumModel>();
        }
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }
}
