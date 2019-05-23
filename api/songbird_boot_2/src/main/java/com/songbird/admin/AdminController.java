package com.songbird.admin;

import com.songbird.user.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping(value = "/upgradeUserToArtist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ActionModel upgradeUserToArtist(@RequestBody ActionModel a){
        return adminService.upgradeUserToArtist(a);
    }

    @RequestMapping(value = "/downgradeUserFromArtist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ActionModel downgradeUserFromArtist(@RequestBody ActionModel a){
        return adminService.downgradeUserFromArtist(a);
    }
}
