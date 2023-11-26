package com.example.demo.controllers;
import com.example.demo.entities.Voivodeship;
import com.example.demo.repositories.VoivodeshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/voivodeship")
public class VoivodeshipControllerr {

    @Autowired
    private VoivodeshipRepository voivodeshipRepository;

    @GetMapping(value = "/allvoivodeships")
    public @ResponseBody Iterable<Voivodeship> getAllVoivodeships(){
        return voivodeshipRepository.findAll();
    }
}
