package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.enums.NotificationType;
import com.example.demo.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Random;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private String apiUrl = "https://api.courier.com/send";

    public void sendNotification(NotificationType notificationType, Integer supporterId) throws Exception {
        String template = switch(notificationType){
            case new_help_offers -> "E68SRAWDDH4X5EMFR45DR8TJWAD9";
            case new_help_requests -> "JJ1FMNJ7Z3MR1WMCVYYTEHEMK6KW";
            case accepted_help_offers -> "M78FNYBYMQME4YMRSBQ6HA8GPMMB";
            case accepted_help_requests -> "W3K920K6114NC5HMFEW9Q0VN7RVM";
        };

        if(supporterId==null){
            throw new Exception("No supporter id provided");
        }
        var emailList = switch(notificationType){
            case new_help_offers -> userRepository.findAllForNewHelpOffersNotification();
            case new_help_requests -> userRepository.findAllForNewHelpRequestsNotification();
            case accepted_help_offers -> userRepository.findAllById(List.of(supporterId));
            case accepted_help_requests -> userRepository.findAllById(List.of(supporterId));
        };

        if(StreamSupport.stream(emailList.spliterator(), false).findAny().isEmpty()){
            throw new Exception("No users to notify found");
        }
        StreamSupport.stream(emailList.spliterator(), false)
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName(), null);
                    var emailDTO = new EmailDTO(user.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList()
                .forEach(email -> {
            try{
                sendEmail(email);
            }catch (Exception e){

            }
        });
    }

    public void sendResetPasswordNotification(String email_address){
        String template = "0A1YB1E9QRMPX2GCQG5YJ9CZMY4F";
        var user =  userRepository.findByEmail(email_address).orElse(null);
        var randomCode = new Random().nextInt(900000)+100000;
        userRepository.updateRandomCode(randomCode, user.getId());

        Stream.of(user)
                .map(userData -> {
                    var dataDTO = new DataDTO(userData.getName(), String.valueOf(randomCode));
                    var emailDTO = new EmailDTO(userData.getEmail_address());
                    var messageDTO = new MessageDTO(emailDTO, template, dataDTO);
                    return new BodyDTO(messageDTO);
                })
                .toList()
                .forEach(email -> {
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
