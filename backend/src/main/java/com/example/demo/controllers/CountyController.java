package com.example.demo.controllers;
import com.example.demo.entities.County;
import com.example.demo.entities.Voivodeship;
import com.example.demo.repositories.CountyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/county")
public class CountyController {

    @Autowired
    private CountyRepository countyRepository;

    @GetMapping(value = "/countiesbyvoivodeship")
    public @ResponseBody Iterable<County> findByVoivodeship(@RequestParam int currentVoivodeship){
        return countyRepository.findByVoivodeship(currentVoivodeship);
    }


}
