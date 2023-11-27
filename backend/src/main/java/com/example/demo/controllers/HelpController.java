package com.example.demo.controllers;
import com.example.demo.dto.HelpWithPhotoDTO;
import com.example.demo.enums.NotificationType;
import com.example.demo.repositories.UserRepository;
import com.example.demo.service.HelpPhotoService;
import com.example.demo.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.entities.Help;
import com.example.demo.repositories.HelpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/v1/help")
public class HelpController {

    @Autowired
    private HelpRepository helpRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private HelpPhotoService helpPhotoService;

    @PostMapping(value = "/addhelp", headers = ("content-type=multipart/*"), consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addHelp(@RequestParam("county") int county, @RequestParam("description") String description,
                        @RequestParam("photo") MultipartFile photo, @RequestParam("side") int side,
                        @RequestParam("author") int author, @RequestParam("type") int type) throws IOException {

        helpPhotoService.uploadObject("inzynierka", "help-photos", photo.getOriginalFilename(), photo.getBytes());
        Help newHelp = new Help();
        newHelp.setCounty(county);
        newHelp.setDescription(description);
        newHelp.setPhoto(photo.getOriginalFilename());
        newHelp.setSide(side);
        newHelp.setAuthor(author);
        newHelp.setType(type);
        newHelp.setHelpStatus(1);
        helpRepository.save(newHelp);

        var notificationType = switch (side){
            case 1 -> NotificationType.new_help_offers;
            case 2 -> NotificationType.new_help_requests;
            default -> throw new IllegalStateException("Unexpected value: " + side);
        };
        notificationService.sendNotification(notificationType);
    }

    @GetMapping(value = "/allhelps")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getAllHelps(){
        return StreamSupport.stream(helpRepository.findAll().spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @GetMapping(value = "/findhelp")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getHelpById(@RequestParam int id){
        return StreamSupport.stream(helpRepository.findHelpById(id).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @DeleteMapping("/deletehelp")
    public ResponseEntity<String> deleteHelp(@RequestParam int id) {
        // Sprawdź, czy oferta istnieje
        Optional<Help> optionalHelp = helpRepository.findById(id);

        if (optionalHelp.isPresent()) {
            // Jeśli oferta istnieje, usuń ją
            helpRepository.delete(optionalHelp.get());
            return new ResponseEntity<>("Pomoc została pomyślnie usunięta.", HttpStatus.OK);
        } else {
            // Jeśli oferta o danym ID nie istnieje, zwróć błąd
            return new ResponseEntity<>("Oferta o podanym ID nie istnieje.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/allhelpoffers")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getAllHelpOffers(){
        return StreamSupport.stream(helpRepository.findBySideAndSupporterAndHelpStatus(1, null, List.of(1,2,3,4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @GetMapping(value = "/allhelprequests")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getAllHelpRequests(){
        return StreamSupport.stream(helpRepository.findBySideAndSupporterAndHelpStatus(2, null, List.of(1,2,3,4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @GetMapping (value ="/acceptedhelprequests")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getAcceptedHelpRequests(@RequestParam int currentUserId){
        return StreamSupport.stream(helpRepository.findBySideAndSupporterAndHelpStatus(2, currentUserId, List.of(2, 3, 4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @GetMapping (value ="/acceptedhelpoffers")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getAcceptedHelpOffers(@RequestParam int currentUserId){
        return StreamSupport.stream(helpRepository.findBySideAndSupporterAndHelpStatus(1, currentUserId, List.of(2, 3, 4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @GetMapping (value = "/myrequests")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getMyHelpRequests(@RequestParam int currentUserId){
        return StreamSupport.stream(helpRepository.findBySideAndAuthorAndHelpStatus(2, currentUserId, List.of(1,2,3,4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }
    @GetMapping (value = "/myhelpoffers")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getMyHelpOffers(@RequestParam int currentUserId){
        return StreamSupport.stream(helpRepository.findBySideAndAuthorAndHelpStatus(1, currentUserId, List.of(1,2,3,4)).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }
    @GetMapping (value = "/myhelprequestsandacceptedhelpoffers")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getMyHelpRequestsAndAcceptedHelpOffers(@RequestParam int currentUserId, @RequestParam String description,
                                                                               @RequestParam Integer voivodeship, @RequestParam Integer county,
                                                                               @RequestParam Integer help_status, @RequestParam Integer help_type,
                                                                               @RequestParam boolean createdByMe) {
        if(createdByMe){
            return StreamSupport.stream(helpRepository.findBySideAndAuthorAndHelpStatus(1, currentUserId, List.of(1,3)).spliterator(), false)
                    .map(help -> {
                        try {
                            return helpPhotoService.getHelpWithPhoto(help);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .toList();
        }else{
            return StreamSupport.stream(helpRepository.findMyHelpRequestsAndAcceptedHelpOffers(currentUserId, description, voivodeship, county, help_status, help_type).spliterator(), false)
                    .map(help -> {
                        try {
                            return helpPhotoService.getHelpWithPhoto(help);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .toList();

        }
        
    }

    @GetMapping (value = "/noncompleted")
    public @ResponseBody Iterable<HelpWithPhotoDTO> getNonCompletedHelpRequestsOrOffers(@RequestParam String description, @RequestParam Integer help_type,
                                                                    @RequestParam Integer voivodeship, @RequestParam Integer county,
                                                                    @RequestParam int side) {

        return StreamSupport.stream(helpRepository.findNonCompletedHelpRequestsOrOffers(description, help_type, voivodeship, county, side).spliterator(), false)
                .map(help -> {
                    try {
                        return helpPhotoService.getHelpWithPhoto(help);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    @PostMapping(value = "/updatehelpstatus")
    public ResponseEntity<?> updateHelpStatus(
            @RequestParam int helpId,
            @RequestParam int help_status
    ) {
        Optional<Help> optionalHelp = helpRepository.findById(helpId);

        if (optionalHelp.isPresent()) {
            Help help = optionalHelp.get();

            // The rest of your code here
            help.setHelpStatus(help_status);
            helpRepository.save(help);
            return new ResponseEntity<>("Help status updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Help offer not found", HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping(value = "/updatehelp")
    public ResponseEntity<?> updateHelp(
            @RequestParam int id,
            @RequestParam String description,
            @RequestParam String photo,
            @RequestParam int type
    ) {
        Optional<Help> optionalHelp = helpRepository.findById(id);

        if (optionalHelp.isPresent()) {
            Help help = optionalHelp.get();

            help.setDescription(description);
            help.setPhoto(photo);
            help.setType(type);

            helpRepository.save(help);

            return new ResponseEntity<>("Pomoc zaktualizowana pomyślnie", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Oferta pomocy nie znaleziona", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/accepthelp")
    public ResponseEntity<?> acceptHelp(
            @RequestParam int id, // Identyfikator akceptowanej oferty
            @RequestParam int supporter
    ) {
        Optional<Help> optionalHelp = helpRepository.findById(id);

        if (optionalHelp.isPresent()) {
            Help help = optionalHelp.get();

            // Aktualizuj pola oferty pomocy
            help.setHelpStatus(2); // Ustawienie statusu oferty na "W trakcie realizacji"
            help.setSupporter(supporter);
            helpRepository.save(help);

            return new ResponseEntity<>("Pomoc zaakceptowana pomyślnie", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Oferta pomocy nie znaleziona", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handle() {
        return ResponseEntity.ok().build();
    }

}
