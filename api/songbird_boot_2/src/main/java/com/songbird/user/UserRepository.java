package com.songbird.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.*;


import javax.persistence.PersistenceContext;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);
}
