package com.example.demo.controllers;
import com.example.demo.entities.AccountStatus;
import com.example.demo.entities.Role;
import com.example.demo.repositories.AccountStatusRepository;
import com.example.demo.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/role")
public class AccountStatusController {

    @Autowired
    private AccountStatusRepository accountStatusRepository;

   @GetMapping(value = "/allaccountstatuses")
    public @ResponseBody Iterable<AccountStatus> getAllUserRoles(){
        return accountStatusRepository.findAll();
    }

}
