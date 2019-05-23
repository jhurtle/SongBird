package com.songbird.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDetailsSecurityService userDetailsSecurityService;

    @Autowired
    private AuthenticationManager authenticationManager;

    //persist

    public UserModel logoutUser() {
        UserModel um = new UserModel();
        //Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //auth.setAuthenticated(false);
        um.message = "User logged out.";
        return um;
    }

    public UserModel deleteUser(UserModel um) {
        userRepository.delete(um.userId);
        um.setMessage("Account deleted");
        return um;
    }

    public UserModel updateUserInfo(UserModel um) {
        User u = userRepository.findOne(um.userId);
        String message = "";
        if (um.first_name != null) {
            if (!um.first_name.equals("")) {
                u.setFirstName(um.first_name);
                message += "first name, ";
            }
        }

        if (um.last_name != null) {
            if (!um.last_name.equals("")) {
                u.setLastName(um.last_name);
                message += "last name, ";
            }
        }

        if (um.email != null) {
            if (!um.email.equals("")) {
                u.setEmail(um.email);
                message += "emaiil, ";

            }
        }

        if (um.password != null) {
            if (!um.password.equals("")) {
                if (um.password.length() >= 6) {
                    if (um.password.equals(um.password_confirm)) {
                        u.setPassword(bCryptPasswordEncoder.encode(um.password));
                        message += "password, ";
                    }
                }
            }
        }

        if(um.changeRole){
            if (um.role >= 0) {
                u.setRole(um.role);
                message += "role, ";
            }
        }


        if (um.theme > 0) {
            u.setTheme(um.theme);
            message += "theme, ";

        }


        if (um.language > 0) {
            message += "language, ";

            u.setLanguage(um.language);
        }
        if (um.quality > 0) {

            message += "quality, ";
            u.setQuality(um.quality);
        }
        message += "updated";
        um.message = message;
        userRepository.save(u);
        return um;
    }

    public UserModel checkLogin() {
        UserModel um = new UserModel();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            um.email = auth.getName();
            User u = userRepository.findByEmail(um.email);
            if (u == null) {
                um.message = "Login required.";
                return um;
            }
            um.first_name = u.firstName;
            um.last_name = u.lastName;
            um.userLoggedIn = true;
            um.userId = u.id;
            um.role = u.role;
            um.theme = u.theme;
            um.language = u.language;
            um.quality = u.quality;
            um.message = "User already logged in.";
        } catch (Exception e) {
            e.printStackTrace();
            um.message = "Login required.";
        }
        return um;
    }

    public UserModel loginUser(UserModel um) {
        System.out.println("UserService>loginUser");
        UserDetails userDetails = userDetailsSecurityService.loadUserByUsername(um.email);
        if (userDetails == null) {
            um.message = "Email not found";
            return um;
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, um.password, userDetails.getAuthorities());
        authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        if (usernamePasswordAuthenticationToken.isAuthenticated()) {
            System.out.println("Setting authentication");
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            User u = userRepository.findByEmail(um.email);
            if(u.getBanned()==1){
                um.message="User is banned";
                return um;
            }
            um.first_name = u.firstName;
            um.last_name = u.lastName;
            um.userLoggedIn = true;
            um.userId = u.id;
            um.role = u.role;
            um.theme = u.theme;
            um.language = u.language;
            um.quality = u.quality;
            um.message = "User has been logged in";
        } else {
            um.message = "User could not be authenticated";
        }
        return um;
    }

    public UserModel registerUser(UserModel um) {
        //check if email already exists
        //      if it does, userCreated=false
        User u = userRepository.findByEmail(um.email);
        if (u == null) {
            //this is a new user
            if (um.password.equals(um.password_confirm)) {
                //passwords match
                if (um.password.length() >= 6) {
                    //password is a sufficient length
                    User newUser = new User();
                    newUser.setEmail(um.email);
                    newUser.setPassword(bCryptPasswordEncoder.encode(um.password));
                    if (um.first_name.equals("") && um.last_name.equals("")) {
                        um.first_name = "Unnamed";
                        um.last_name = "User";
                    }
                    newUser.setFirstName(um.first_name);
                    newUser.setLastName(um.last_name);
                    userRepository.save(newUser);
                    um.userCreated = true;
                    um.message = "Account has successfully been created";
                    return um;
                } else {
                    um.message = "Password must be atleast 6 characters";
                    return um;
                }
            } else {
                um.message = "Passwords do not match";
                return um;
            }
        } else {
            //this user already exists
            um.message = "Email is already being used";
            return um;
        }
    }

    public void changePassword() {

    }

    @Transactional
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void addUser(User u) {
        //this.userRepository.addUser(u);
        userRepository.save(u);
    }

    @Transactional
    public void setBan(int id) {
        User u = userRepository.findOne(id);
        if(u.getBanned() == 0) {
            u.setBanned(1);
        } else {
            u.setBanned(0);
        }
        userRepository.save(u);
    }

    @Transactional
    public void removeBan(User u) {
        u.setBanned(0);
    }

    @Transactional
    public User getUserById(int id) {
        return userRepository.findOne(id);
    }

    @Transactional
    public void removeUser(int id) {
        userRepository.delete(id);
    }


    public UserDetails findByEmail(String email) {
        User ua = userRepository.findByEmail(email);
        System.out.println("UserService>findByEmail: Loading user by username");
        if (ua == null) {
            return null;
        }
        return new org.springframework.security.core.userdetails.User(ua.getEmail(), ua.getPassword(), new HashSet<>());
    }

    public void save(User u) {

    }
}
