package com.songbird.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:8000", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @RequestMapping(value = "checkLogin", method = RequestMethod.GET)
    public UserModel checkLogin(){
        return userService.checkLogin();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public UserModel login(@RequestBody UserModel um){
        System.out.println("RequestMapping login");
        UserModel uaa = userService.loginUser(um);
        return uaa;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public UserModel register(@RequestBody UserModel um){
        return userService.registerUser(um);
    }


/*
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public UserModel logout(){
        return userService.logoutUser();
    }
    */

    @RequestMapping(value = "/registerA", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private Iterable<User> registerA(@RequestBody UserModel um){
        userService.registerUser(um);
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public UserModel logout(HttpSession session){
        session.invalidate();
        return userService.logoutUser();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public UserModel update(@RequestBody UserModel um){
        return userService.updateUserInfo(um);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public UserModel delete(@RequestBody UserModel um){
        return userService.deleteUser(um);
    }

    @RequestMapping(value = "{id}/remove", method = RequestMethod.POST)
    private Iterable<User> removeUser(@PathVariable("id") int id) {
        userService.removeUser(id);
        return userService.getAllUsers();
    }

    @RequestMapping(value = "{id}/ban", method = RequestMethod.POST)
    private Iterable<User> banUser(@PathVariable("id") int id) {
        userService.setBan(id);
        return userService.getAllUsers();
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private User getUser(@PathVariable("id") int id) { return userService.getUserById(id);}


    @RequestMapping(value = "", method=RequestMethod.GET)
    private Iterable<User> getAllUsers() {return userService.getAllUsers();}
}
