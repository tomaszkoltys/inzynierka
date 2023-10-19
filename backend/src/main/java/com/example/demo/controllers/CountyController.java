package com.example.demo.controllers;
import com.example.demo.entities.County;
import com.example.demo.entities.Voivodeship;
import com.example.demo.repositories.CountyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountyController {

    @Autowired
    private CountyRepository countyRepository;

    @GetMapping(value = "/countiesbyvoivodeship")
    public @ResponseBody Iterable<County> findByVoivodeship(@RequestParam int currentVoivodeship){
        return countyRepository.findByVoivodeship(currentVoivodeship);
    }


}
