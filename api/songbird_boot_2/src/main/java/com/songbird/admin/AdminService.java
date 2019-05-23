package com.songbird.admin;

import com.songbird.music.artist.Artist;
import com.songbird.music.artist.ArtistRepository;
import com.songbird.user.User;
import com.songbird.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArtistRepository artistRepository;

    /*
        1.  Create a new artist object
        2.  Retrieve user from DB
        3.  Pair user and artist together
        4.  Save artist
        5.  Return result
     */
    public ActionModel upgradeUserToArtist(ActionModel a){
        ActionModel result = new ActionModel();
        User user = null;
        user = userRepository.findOne(a.user_to_modify);
        Artist artist = artistRepository.findByUser(user);

        if(artist != null){
            result.setMessage("User is already an artist.");
            return result;
        }
        artist = new Artist();

        if(user != null){
            artist.setUser(user);
            String artistName = "Unnamed Artist";
            try {
                String first = user.getFirstName();
                String last = user.getLastName();
                artistName = first + " " + last;
            } catch (Exception e){
                e.printStackTrace();
            }
            artist.setArtSrc("http://www.racialjusticenetwork.co.uk/wp-content/uploads/2016/12/default-profile-picture.png");
            artist.setName(artistName);
            user.setRole(2);
            userRepository.save(user);
            artistRepository.save(artist);
            result.success = true;
            result.message = "User has been converted to an artist.";
        } else {
            result.message = "User does not exist";
        }
        return result;
    }

    public ActionModel downgradeUserFromArtist(ActionModel a){
        ActionModel result = new ActionModel();
        try{
            User user = userRepository.findOne(a.user_to_modify);
            Artist artist = artistRepository.findByUser(user);
            artistRepository.delete(artist);
            user.setRole(0);
            userRepository.save(user);
            result.success = true;
            result.message = "User has been downgraded from an artist.";
            return result;
        } catch(Exception e){
            result.message = "User could not be downgraded from an artist.";
            return result;
        }
    }
}
