package com.songbird.music.artist;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.songbird.music.album.Album;
import com.songbird.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConcertRepository concertRepository;

    @Transactional
    public Artist updateBioJ(int id,String bioJson) {
        ObjectMapper mapper = new ObjectMapper();
        String name = "";
        try{
            JsonNode json = mapper.readTree(bioJson);
            JsonNode nameNode = json.get("data");
            name = nameNode.textValue();
        }
        catch(IOException e){

        }
        if(name.equals("")){
            System.out.println("Invalid Bio");
            return null;
        }
        Artist artist = artistRepository.findOne(id);
        artist.setDescription(name);
        artistRepository.save(artist);
        return artist;
    }

    @Transactional
    public Artist renameArtist(int id,String nameJson) {
        ObjectMapper mapper = new ObjectMapper();
        String name = "";
        try{
            JsonNode json = mapper.readTree(nameJson);
            JsonNode nameNode = json.get("data");
            name = nameNode.textValue();
            Artist artist = artistRepository.findOne(id);
            artist.setName(name);
            artistRepository.save(artist);
            return artistRepository.findOne(id);
        }
        catch(IOException e){

        }
        if(name.equals("")){
            System.out.println("Invalid Name");
        }
        return null;
    }

    @Transactional
    public Artist changeProfileJ(MultipartFile file,int artistId,String fileName){
        try{
            Artist artist = artistRepository.findOne(artistId);
            if(!file.isEmpty()){
                byte[] bytes = file.getBytes();
                String rootPath = "..\\..";
                File dir = new File(rootPath + File.separator
                        + "ui" + File.separator + "Artists" +File.separator + artist.getId());
                if(!dir.exists()){
                    System.out.println("New directory created");
                    dir.mkdirs();
                }
                File serverFile = new File(dir.getPath()
                        + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                artist.setArtSrc("..\\..\\Artists\\" + artist.getId() + File.separator + fileName);
                System.out.println("ChangeWasSuccess");
                artistRepository.save(artist);
                return artist;
            }
        }
        catch(IOException e){
            e.printStackTrace();
        }
        return null;
    }

    @Transactional
    public Artist addConcertJ(int artistId,String date,String time,String address,String description){
        Concert concert = new Concert();
        concert.setDescription(description);
        concert.setTime(time);
        concert.setDate(date);
        concert.setAddress(address);
        Artist artist = artistRepository.findOne(artistId);
        concert.setArtist(artist);
        artist.addConcert(concert);
        concertRepository.save(concert);
        artistRepository.save(artist);
        return artistRepository.findOne(artistId);

    }
    @Transactional
    public Artist updateConcertJ(int artistId,int concertId,String date,String time,String address,String description){
        Concert concert = concertRepository.findOne(concertId);
        concert.setDescription(description);
        concert.setTime(time);
        concert.setDate(date);
        concert.setAddress(address);
        concertRepository.save(concert);
        return artistRepository.findOne(artistId);
    }
    @Transactional
    public Artist removeConcertJ(int artistId,int concertId){
        concertRepository.delete(concertId);
        return artistRepository.findOne(artistId);
    }
    @Transactional
    public Artist getArtistByUserId(int id) {
        return artistRepository.findByUser(userRepository.findOne(id));
    }

    @Transactional
    public Artist addArtist(Artist a){
        return artistRepository.save(a);
    }

    @Transactional
    public Artist getArtist(int id) {
        return artistRepository.findOne(id);
    }

    @Transactional
    public Iterable<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Transactional
    public void removeArtist(String auth, int id){
        if(auth.equals("12345")){
            artistRepository.delete(id);
        }
        //remove all corresponding albums
    }

    @Transactional
    public void updateArtist(Artist a, int id){
        Artist oldArtist = artistRepository.findOne(id);
        if(oldArtist != null){
            if(a.getName()!= null){
                oldArtist.setName(a.getName());
            }
            if(a.getDescription()!=null){
                oldArtist.setDescription(a.getDescription());
            }
            if(a.getArtSrc()!=null){
                oldArtist.setArtSrc(a.getArtSrc());
            }
            artistRepository.save(oldArtist);
        }
    }
}
