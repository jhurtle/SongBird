package com.songbird.music.album;

import com.songbird.music.artist.Artist;
import com.songbird.music.artist.ArtistRepository;
import com.songbird.music.song.Song;
import com.songbird.music.song.SongModel;
import com.songbird.music.song.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Comparator;
import java.util.List;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private SongRepository songRepository;

    @Transactional
    public void addAlbum(String artistId, Album a){
        Artist ar = null;
        try {
            int artistIdInt = Integer.valueOf(artistId);
            ar = artistRepository.findOne(artistIdInt);
        } catch(Exception e){
            e.printStackTrace();
            return;
        }
        a.setArtist(ar);
        a.setArtSrc("https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=5888508");
        albumRepository.save(a);
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>IN AlbumService.addAlbum");
        System.out.println("Albumname: "+albumRepository.findOne(a.id).getName());
        ar.addAlbum(a);
        artistRepository.save(ar);
    }

    @Transactional
    public Album getAlbum(int id) {
        return albumRepository.findOne(id);
    }

    @Transactional
    public AlbumModel getAlbumToPlay(int id) {
        Album a = albumRepository.findOne(id);
        AlbumModel album= new AlbumModel();
        album.setId(a.getId());
        album.setAlbumName(a.getName());
        album.setArtistId(a.getArtist().getId());
        album.setArtistName(a.getArtist().getName());
        for(Song s: a.getSongs()){
            SongModel song= new SongModel();
            song.setId(s.getId());
            song.setSongName(s.getName());
            song.setAlbumId(a.getId());
            song.setAlbumName(a.getName());
            song.setArtistId(a.getArtist().getId());
            song.setArtistName(a.getArtist().getName());
            song.setArtSrc(a.getArtSrc());
            song.setAudioSrc(s.getAudioSrc());
            song.setTrackNum(s.getTrackNumber());
            song.setDuration(s.getRuntime());
            album.addTrack(song);
        }
        List<SongModel> tracks=album.getTracks();
        tracks.sort(Comparator.comparingInt(SongModel::getTrackNum));
        album.setTracks(tracks);
        return album;

    }

    @Transactional
    public Iterable<Album> getAllArtists() {
        return albumRepository.findAll();
    }

    @Transactional
    public void removeAlbum(String auth, int id){
        if(auth.equals("12345")){
            Album a = albumRepository.findOne(id);
            albumRepository.delete(a);
        }
    }

    @Transactional
    public Artist updateJ(MultipartFile file,String fileName,String albumName,int albumId){
        Album album = albumRepository.findOne(albumId);
        try{
            if(!file.isEmpty()){
                byte[] bytes = file.getBytes();
                String rootPath = "..\\..";
                File dir = new File(rootPath + File.separator
                       + "ui" + File.separator + "Artists" +File.separator + album.getArtist().getId());
                if(!dir.exists()){
                    dir.mkdirs();
                }
                File serverFile = new File(dir.getPath()
                        + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                album.setArtSrc("..\\..\\Artists\\" + album.getArtist().getId() + File.separator +fileName);
                album.setName(albumName);
                int artistId = album.getArtist().getId();
                albumRepository.save(album);
                return artistRepository.findOne(artistId);

            }
        }
        catch(IOException e){
            e.printStackTrace();
        }
        return null;
    }
    @Transactional
    public Artist createJ(MultipartFile file,String fileName,String albumName,int artistId){
        try{
            Album album = new Album();
            Artist artist = artistRepository.findOne(artistId);
            album.setArtist(artist);
            album.setName(albumName);
            if(!file.isEmpty()){
                byte[] bytes = file.getBytes();
                String rootPath = "..\\..";
                File dir = new File(rootPath + File.separator
                        + "ui" + File.separator + "Artists" +File.separator + album.getArtist().getId());
                if(!dir.exists()){
                    dir.mkdirs();
                }
                File serverFile = new File(dir.getPath()
                        + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                album.setArtSrc("..\\..\\Artists\\" + album.getArtist().getId() + File.separator +fileName);
                album.setName(albumName);
                albumRepository.save(album);
                return artistRepository.findOne(artistId);

            }
        }
        catch(IOException e){
            e.printStackTrace();
        }
        return null;
    }

    @Transactional
    public void updateAlbum(Album a, int id){
        Album oldAlbum = albumRepository.findOne(id);
        if(oldAlbum != null){
            if(a.getName() != null){
                oldAlbum.setName(a.getName());
            }
            if(a.getArtSrc() != null){
                oldAlbum.setArtSrc(a.getArtSrc());
            }
            if(a.getDescription() != null){
                oldAlbum.setDescription(a.getDescription());
            }
            albumRepository.save(oldAlbum);
        }
    }
}
