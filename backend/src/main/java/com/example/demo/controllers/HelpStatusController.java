package com.example.demo.controllers;
import com.example.demo.entities.HelpStatus;
import com.example.demo.repositories.HelpStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/help-status")
public class HelpStatusController {

    @Autowired
    private HelpStatusRepository helpStatusRepository;

    @GetMapping(value = "/allhelpstatuses")
    public @ResponseBody Iterable<HelpStatus> getAllHelpStatuses(){
        return helpStatusRepository.findAll();
    }



}
