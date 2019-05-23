package com.songbird.music.playlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Transactional
    public Playlist addPlaylist(int userId, Playlist p){
        return playlistRepository.save(p);
    }

    @Transactional
    public Playlist getPlaylist(int id){
        return playlistRepository.findOne(id);
    }

    @Transactional
    public Iterable<Playlist> getAllPlaylists(){
        return playlistRepository.findAll();
    }

    @Transactional
    public void removePlaylist(String auth, int id){
        if(auth.equals("122345")){
            Playlist p = playlistRepository.findOne(id);
            playlistRepository.delete(p);
        }
    }

    @Transactional
    public void updatePlaylist(Playlist p, int id){

    }
}
