package com.example.demo.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.entities.Help;
import com.example.demo.repositories.HelpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/help")
public class HelpController {

    @Autowired
    private HelpRepository helpRepository;

    @PostMapping(value = "/addhelp", consumes = {"*/*"})
    public void addHelp(@RequestParam int county, @RequestParam String description,
                        @RequestParam String photo, @RequestParam int side,
                        @RequestParam int author, @RequestParam int type){

        Help newHelp = new Help();
        newHelp.setCounty(county);
        newHelp.setDescription(description);
        newHelp.setPhoto(photo);
        newHelp.setSide(side);
        newHelp.setAuthor(author);
        newHelp.setType(type);
        newHelp.setHelpStatus(1);
        helpRepository.save(newHelp);
    }

    @GetMapping(value = "/allhelps")
    public @ResponseBody Iterable<Help> getAllHelps(){
        return helpRepository.findAll();
    }

    @GetMapping(value = "/findhelp")
    public @ResponseBody Iterable<Help> getHelpById(@RequestParam int id){
        return helpRepository.findHelpById(id);
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
    public @ResponseBody Iterable<Help> getAllHelpOffers(){
        return helpRepository.findBySideAndSupporterAndHelpStatus(1, null, List.of(1,2,3,4));
    }

    @GetMapping(value = "/allhelprequests")
    public @ResponseBody Iterable<Help> getAllHelpRequests(){
        return helpRepository.findBySideAndSupporterAndHelpStatus(2, null, List.of(1,2,3,4));
    }

    @GetMapping (value ="/acceptedhelprequests")
    public @ResponseBody Iterable<Help> getAcceptedHelpRequests(@RequestParam int currentUserId){
        return helpRepository.findBySideAndSupporterAndHelpStatus(2, currentUserId, List.of(2, 3, 4));
    }

    @GetMapping (value ="/acceptedhelpoffers")
    public @ResponseBody Iterable<Help> getAcceptedHelpOffers(@RequestParam int currentUserId){
        return helpRepository.findBySideAndSupporterAndHelpStatus(1, currentUserId, List.of(2, 3, 4));
    }

    @GetMapping (value = "/myrequests")
    public @ResponseBody Iterable<Help> getMyHelpRequests(@RequestParam int currentUserId){
        return helpRepository.findBySideAndAuthorAndHelpStatus(2, currentUserId, List.of(1,2,3,4));
    }
    @GetMapping (value = "/myhelpoffers")
    public @ResponseBody Iterable<Help> getMyHelpOffers(@RequestParam int currentUserId){
        return helpRepository.findBySideAndAuthorAndHelpStatus(1, currentUserId, List.of(1,2,3,4));
    }
    @GetMapping (value = "/myhelprequestsandacceptedhelpoffers")
    public @ResponseBody Iterable<Help> getMyHelpRequestsAndAcceptedHelpOffers(@RequestParam int currentUserId, @RequestParam String description,
                                                                               @RequestParam Integer voivodeship, @RequestParam Integer county,
                                                                               @RequestParam Integer help_status, @RequestParam Integer help_type,
                                                                               @RequestParam boolean createdByMe) {
        if(createdByMe){
            return helpRepository.findBySideAndAuthorAndHelpStatus(1, currentUserId, List.of(1,3));
        }else{
            return  helpRepository.findMyHelpRequestsAndAcceptedHelpOffers(currentUserId, description, voivodeship, county, help_status, help_type);
        }
        
    }

    @GetMapping (value = "/noncompleted")
    public @ResponseBody Iterable<Help> getNonCompletedHelpRequestsOrOffers(@RequestParam String description, @RequestParam Integer help_type,
                                                                    @RequestParam Integer voivodeship, @RequestParam Integer county,
                                                                    @RequestParam int side) {
        return helpRepository.findNonCompletedHelpRequestsOrOffers(description, help_type, voivodeship, county, side);
    }

//    @GetMapping (value = "/updatehelpstatus")
//    public void updateHelpStatus(@RequestParam int helpId){
//        helpRepository.updateHelpStatus(helpId);
//    }
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
