package com.example.demo.controllers;


import com.example.demo.enums.NotificationType;
import com.example.demo.repositories.UserNotificationSettingsRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.service.NotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
public class NotificationController {

    private final UserNotificationSettingsRepository userNotificationSettingsRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @PostMapping(value = "/newhelpoffers")
    public void sendNewHelpOffers() throws JsonProcessingException {
        notificationService.sendNotification(NotificationType.new_help_offers);
    }

    @PostMapping(value = "/acceptedhelpoffers")
    public void sendAcceptedHelpOffers() throws JsonProcessingException {
        notificationService.sendNotification(NotificationType.accepted_help_offers);
    }

    @PostMapping(value = "/acceptedhelprequests")
    public void sendAcceptedHelpRequests() throws JsonProcessingException {
        notificationService.sendNotification(NotificationType.accepted_help_requests);
    }

    @PostMapping(value = "/newhelprequests")
    public void sendNewHelpRequests() throws JsonProcessingException {
        notificationService.sendNotification(NotificationType.new_help_requests);
    }






}
