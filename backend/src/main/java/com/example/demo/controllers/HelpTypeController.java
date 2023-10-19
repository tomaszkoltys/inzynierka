package com.example.demo.controllers;
import com.example.demo.entities.HelpType;
import com.example.demo.repositories.HelpTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelpTypeController {

    @Autowired
    private HelpTypeRepository helpTypeRepository;

    @GetMapping(value = "/allhelptypes")
    public @ResponseBody Iterable<HelpType> getAllHelpTypes(){
        return helpTypeRepository.findAll();
    }



}
