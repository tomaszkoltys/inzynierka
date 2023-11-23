package com.example.demo.controllers;


import com.example.demo.dto.BodyDTO;
import com.example.demo.dto.DataDTO;
import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.MessageDTO;
import com.example.demo.entities.UserNotificationSettings;
import com.example.demo.repositories.UserNotificationSettingsRepository;
import com.example.demo.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    @Autowired
    private UserNotificationSettingsRepository userNotificationSettingsRepository;

    @Autowired
    private UserRepository userRepository;

    private RestTemplate restTemplate = new RestTemplate();
    private String apiUrl = "https://api.courier.com/send";


    @PostMapping(value = "/sendnotification")
    public void sendNotification(@RequestParam int user_id){
        String email = "aleksandra.wojcik17@gmail.com";
        String template = "E68SRAWDDH4X5EMFR45DR8TJWAD9";
        String name = "stasiu";
        String body = String.format("{\"message\":{\"to\":{\"email\":\"%s\"},\"template\":\"%s\",\"data\":{\"username\":\"%s\"}}}",
                email, template, name);
        MultiValueMap<String, String> requestHeaders = new LinkedMultiValueMap<String,String>();
        requestHeaders.add("Authorization", "Bearer pk_prod_FWNRT8AZ5QMNR5P59742JYN3GM3C");
        HttpEntity<String> request = new HttpEntity<>(body, requestHeaders);
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);

    }

    @PostMapping(value = "/newhelpoffers")
    public void sendNewHelpOffers() throws JsonProcessingException {

        String template = "E68SRAWDDH4X5EMFR45DR8TJWAD9";

        var emailList = userRepository.findAllForNewHelpOffersNotification()
                .stream()
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName());
                    var emailDTO = new EmailDTO(user.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList();
        emailList.forEach(email -> {
            try{
                sendEmail(email);
            }catch (Exception e){

            }
        });
    }

    @PostMapping(value = "/acceptedhelpoffers")
    public void sendAcceptedHelpOffers() throws JsonProcessingException {

        String template = "M78FNYBYMQME4YMRSBQ6HA8GPMMB";

        var emailList = userRepository.findAllForAcceptedHelpOffersNotification()
                .stream()
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName());
                    var emailDTO = new EmailDTO(user.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList();
        emailList.forEach(email -> {
            try{
                sendEmail(email);
            }catch (Exception e){

            }
        });
    }

    @PostMapping(value = "/acceptedhelprequests")
    public void sendAcceptedHelpRequests() throws JsonProcessingException {

        String template = "W3K920K6114NC5HMFEW9Q0VN7RVM";

        var emailList = userRepository.findAllForAcceptedHelpRequestsNotification()
                .stream()
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName());
                    var emailDTO = new EmailDTO(user.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList();
        emailList.forEach(email -> {
            try{
                sendEmail(email);
            }catch (Exception e){

            }
        });
    }

    @PostMapping(value = "/newhelprequests")
    public void sendNewHelpRequests() throws JsonProcessingException {

        String template = "JJ1FMNJ7Z3MR1WMCVYYTEHEMK6KW";

        var emailList = userRepository.findAllForNewHelpRequestsNotification()
                .stream()
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName());
                    var emailDTO = new EmailDTO(user.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList();
        emailList.forEach(email -> {
            try{
                sendEmail(email);
            }catch (Exception e){

            }
        });
    }

    private void sendEmail(BodyDTO bodyDTO) throws JsonProcessingException {
        ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String body = objectWriter.writeValueAsString(bodyDTO);

        MultiValueMap<String, String> requestHeaders = new LinkedMultiValueMap<String,String>();
        requestHeaders.add("Authorization", "Bearer pk_prod_FWNRT8AZ5QMNR5P59742JYN3GM3C");
        HttpEntity<String> request = new HttpEntity<>(body, requestHeaders);
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
    }




}
