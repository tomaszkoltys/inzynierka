package com.example.demo.service;

import com.example.demo.dto.BodyDTO;
import com.example.demo.dto.DataDTO;
import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.MessageDTO;
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

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private String apiUrl = "https://api.courier.com/send";

    public void sendNotification(NotificationType notificationType){
        String template = switch(notificationType){
            case new_help_offers -> "E68SRAWDDH4X5EMFR45DR8TJWAD9";
            case new_help_requests -> "JJ1FMNJ7Z3MR1WMCVYYTEHEMK6KW";
            case accepted_help_offers -> "M78FNYBYMQME4YMRSBQ6HA8GPMMB";
            case accepted_help_requests -> "W3K920K6114NC5HMFEW9Q0VN7RVM";
        };

        var emailList = switch(notificationType){
            case new_help_offers -> userRepository.findAllForNewHelpOffersNotification();
            case new_help_requests -> userRepository.findAllForNewHelpRequestsNotification();
            case accepted_help_offers -> userRepository.findAllForAcceptedHelpOffersNotification();
            case accepted_help_requests -> userRepository.findAllForAcceptedHelpRequestsNotification();
        };

        emailList.stream()
                .map(user -> {
                    var dataDTO = new DataDTO(user.getName());
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

    private void sendEmail(BodyDTO bodyDTO) throws JsonProcessingException {
        ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String body = objectWriter.writeValueAsString(bodyDTO);

        MultiValueMap<String, String> requestHeaders = new LinkedMultiValueMap<String,String>();
        requestHeaders.add("Authorization", "Bearer pk_prod_FWNRT8AZ5QMNR5P59742JYN3GM3C");
        HttpEntity<String> request = new HttpEntity<>(body, requestHeaders);
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
    }
}
