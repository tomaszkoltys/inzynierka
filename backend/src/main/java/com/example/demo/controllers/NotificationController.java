package com.example.demo.controllers;


import com.example.demo.dto.BodyDTO;
import com.example.demo.dto.DataDTO;
import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.MessageDTO;
import com.example.demo.enums.NotificationType;
import com.example.demo.repositories.UserNotificationSettingsRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.service.NotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

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
