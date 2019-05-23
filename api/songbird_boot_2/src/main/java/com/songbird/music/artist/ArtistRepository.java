package com.songbird.music.artist;

import com.songbird.user.User;
import org.springframework.data.repository.CrudRepository;

public interface ArtistRepository extends CrudRepository<Artist, Integer>{
    Artist findByUser(User u);
}
