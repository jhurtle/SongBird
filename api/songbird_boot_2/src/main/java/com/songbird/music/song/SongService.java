package com.songbird.music.song;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.songbird.music.album.Album;
import com.songbird.music.album.AlbumRepository;
import com.songbird.music.artist.Artist;
import com.songbird.music.artist.ArtistRepository;
import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.songbird.music.album.Album;
import com.songbird.music.album.AlbumService;

import java.io.*;
import java.util.concurrent.TimeUnit;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Transactional
    public Album renameSongJ(int songId, String nameJson){
        ObjectMapper mapper = new ObjectMapper();
        String name = "";
        try{
            JsonNode json = mapper.readTree(nameJson);
            JsonNode nameNode = json.get("data");
            name = nameNode.textValue();
        }
        catch(IOException e){

        }
        if(name.equals("")){
            System.out.println("Error in extracting name from json");
            return null;
        }
        Song song = songRepository.findOne(songId);
        song.setName(name);
        songRepository.save(song);
        return song.getAlbum();
    }

    @Transactional
    public void addSong(String albumId,Song s) {
        Album al = null;
        try {
            int albumIdInt = Integer.valueOf(albumId);
            al = albumRepository.findOne(albumIdInt);
        } catch(Exception e) {
            e.printStackTrace();
            return;
        }
        s.setAlbum(al);
        al.addSong(s);
        songRepository.save(s);
        albumRepository.save(al);
    }

    @Transactional
    public Album addSongJ(MultipartFile file,String fileName,String songName,String lyrics,int albumId){
        Song newSong = new Song();
        newSong.setName(songName);
        newSong.setLyrics(lyrics);
        newSong.setPlays(0);
        newSong.setRating(0);
        Album album = albumRepository.findOne(albumId);
        newSong.setAlbum(album);
        newSong.setTrackNumber(album.getSongs().size()+1);
        album.addSong(newSong);
        String artistName = album.getArtist().getName();
        try{
            if(!file.isEmpty()){
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = "..\\..";
                File dir = new File(rootPath + File.separator +
                        "ui" + File.separator + "Artists" +File.separator + album.getArtist().getId());
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                newSong.setAudioSrc("..\\..\\Artists\\" + album.getArtist().getId() + File.separator +fileName);
                stream.close();
                songRepository.save(newSong);
                albumRepository.save(album);
                return albumRepository.findOne(albumId);

            }
        }
        catch(IOException e){
            System.out.println(e.getStackTrace());
            return null;
        }
        return null;
    }

    @Transactional
    public void addFeaturedArtist(int songId, int artistId){
        Song s = songRepository.findOne(songId);
        Artist artist = artistRepository.findOne(artistId);
        if(s != null && artist != null){
            s.addFeaturedArtist(artist);
            int albumId = s.getAlbum().getId();
            songRepository.save(s);
        }
    }


    /*@Transactional
    public Album changePrivacy(int songId){
        Song song = songRepository.findOne(songId);
        if(song.privacy==1){
            song.setPrivacy(0);
        }
        else{
            song.setPrivacy(1);
        }
        songRepository.save(song);
        return song.getAlbum();
    }*/

    @Transactional
    public Album changePrivacy(int songId){
        Song song = songRepository.findOne(songId);
        if(song.getPrivacy()==1){
            song.setPrivacy(0);
        }
        else{
            song.setPrivacy(1);
        }
        songRepository.save(song);
        return song.getAlbum();
    }
    @Transactional
    public Album setPendingJ(int songId){
        Song song = songRepository.findOne(songId);
        if(song.getPending()==1){
            song.setPending(0);
        }
        else{
            song.setPending(1);
        }
        songRepository.save(song);
        return song.getAlbum();
    }
    @Transactional
    public void removeFeaturedArtist(int songId, int artistId){
        Song s = songRepository.findOne(songId);
        Artist artist = artistRepository.findOne(artistId);
        if(s != null && artist != null){
            s.removeFeaturedArtist(artist);
            songRepository.save(s);
        }
    }

    @Transactional
    public Song getSong(int id) {
        return songRepository.findOne(id);
    }

    @Transactional
    public SongModel getSongToPlay(int id) {
        Song s=songRepository.findOne(id);
        SongModel song=new SongModel();
        song.id=s.getId();
        song.songName=s.getName();
        song.artistName=s.getAlbum().getArtist().getName();
        song.artistId=s.getAlbum().getArtist().getId();
        song.albumName=s.getAlbum().getName();
        song.albumId=s.getAlbum().getId();
        song.artSrc=s.getAlbum().getArtSrc();
        song.audioSrc=s.getAudioSrc();
        song.trackNum=s.getTrackNumber();
        song.duration=s.getRuntime();
        return song;
    }



    @Transactional
    public Iterable<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Transactional
    public Album removeSong(int id){
        int albumId = songRepository.findOne(id).getAlbum().getId();
        /*Album album = albumRepository.findOne(albumId);
        int songIndex = album.getSongs().indexOf(songRepository.findOne(id))+1;
        for(;songIndex < album.getSongs().size();songIndex++){
            Song song = album.getSongs().get(songIndex);
            song.setTrackNumber(song.getTrackNumber()-1);
        }*/
        songRepository.delete(id);
        return albumRepository.findOne(albumId);
    }

        @Transactional
    public void updateSong(Song s, int id){
        if(songRepository.findOne(id) != null){
            s.setId(id);
            songRepository.save(s);
        }
    }
    public void incrementPlays(int id){
        Song s;
        if( songRepository.findOne(id)!=null){
            s=songRepository.findOne(id);
        }

    }
}
