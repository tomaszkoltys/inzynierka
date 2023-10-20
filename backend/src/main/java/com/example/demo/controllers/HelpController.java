package com.example.demo.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.entities.Help;
import com.example.demo.repositories.HelpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @GetMapping(value = "/allhelpoffers")
    public @ResponseBody Iterable<Help> getAllHelpOffers(){
        return helpRepository.findBySide(1);
    }

    @GetMapping(value = "/allhelprequests")
    public @ResponseBody Iterable<Help> getAllHelpRequests(){
        return helpRepository.findBySide(2);
    }

    @GetMapping (value ="/acceptedhelprequests")
    public @ResponseBody Iterable<Help> getAcceptedHelpRequests(@RequestParam int currentUserId){
        return helpRepository.findBySideAndSupporterAndHelpStatus(1, currentUserId, List.of(1));
    }
    @GetMapping (value = "/myrequests")
    public @ResponseBody Iterable<Help> getMyHelpRequests(@RequestParam int currentUserId){
        return helpRepository.findBySideAndAuthorAndHelpStatus(1, currentUserId, List.of(1,3));
    }
    @GetMapping (value = "/myhelpoffers")
    public @ResponseBody Iterable<Help> getMyHelpOffers(@RequestParam int currentUserId){
        return helpRepository.findBySideAndAuthorAndHelpStatus(2, currentUserId, List.of(1,3));
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

    @GetMapping (value = "/updatehelpstatus")
    public void updateHelpStatus(@RequestParam int helpId){
        helpRepository.updateHelpStatus(helpId);
    }



}
