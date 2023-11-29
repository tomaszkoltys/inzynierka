package com.example.demo.controllers;

import com.example.demo.entities.UserNotificationSettings;
import com.example.demo.repositories.UserNotificationSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notificationsettings")
public class UserNotificationSettingsController {

    @Autowired
    private UserNotificationSettingsRepository userNotificationSettingsRepository;

    @GetMapping(value = "/getusersettings")
    public @ResponseBody UserNotificationSettings getUserSettings(@RequestParam int user_id){
        return userNotificationSettingsRepository.getUserSettings(user_id).orElse(null);

    }

    @PostMapping(value = "/setusersettings")
    public @ResponseBody UserNotificationSettings setUserSettings(@RequestParam int user_id, @RequestParam boolean new_help_offers,
                                                                  @RequestParam boolean new_help_requests, @RequestParam boolean accepted_help_offers,
                                                                  @RequestParam boolean accepted_help_requests){
        var setting = userNotificationSettingsRepository.getUserSettings(user_id).orElse(new UserNotificationSettings(user_id));
        setting.setAccepted_help_offers(accepted_help_offers);
        setting.setAccepted_help_requests(accepted_help_requests);
        setting.setNew_help_requests(new_help_requests);
        setting.setNew_help_offers(new_help_offers);
        userNotificationSettingsRepository.save(setting);
        return setting;
    }
}
