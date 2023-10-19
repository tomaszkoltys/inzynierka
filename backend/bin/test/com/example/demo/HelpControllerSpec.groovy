package com.example.demo

import com.example.demo.controllers.HelpController
import com.example.demo.entities.User
import com.example.demo.repositories.UserRepository
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringRunner
import spock.lang.Specification

@SpringBootTest

class HelpControllerSpec extends Specification{
    @InjectMocks
    @Autowired
    private UserRepository userRepository
    @Test
    def "Should return only helps created by me in getMyHelpRequestsAndAcceptedHelpOffers"(){
        given:
        User newUser = new User()
        newUser.setId(7)
        userRepository.save(newUser)

        when:
        def foundUser = userRepository.findUser(7).get()

        then:
        foundUser.equals(newUser)
    }

}
