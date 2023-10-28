package com.example.demo.controllers;
import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

   @GetMapping(value = "/alluserroles")
    public @ResponseBody Iterable<Role> getAllUserRoles(){
        return roleRepository.findAll();
    }


}
