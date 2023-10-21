package com.example.demo.controllers;
import com.example.demo.entities.Help;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

  /*  @PostMapping(value = "/addrating")
    public void addRating(@RequestParam int ratedUserId, @RequestParam int rating){
        User ratedUser = userRepository.findUser(ratedUserId).orElse(null);
        int newRatingCount = ratedUser.getRating_count() + 1;
        float newAverageRating = (ratedUser.getAverage_rating() * ratedUser.getRating_count() + rating)/ newRatingCount;
        userRepository.addUserRating(ratedUserId, newAverageRating, newRatingCount);
    }

    @GetMapping(value = "/getrating")
    public float getRating(@RequestParam int ratedUserId){
        return userRepository.findUser(ratedUserId).orElse(null).getAverage_rating();
    }*/

    @GetMapping(value = "/getallusers")
    public @ResponseBody Iterable<User> getAllUsers(@RequestParam String name, @RequestParam String username, @RequestParam String email_address,
                                                    @RequestParam Integer status, @RequestParam Integer role){
        return userRepository.findAllWithFilters(name, username, email_address, status, role);
    }

    @GetMapping(value = "/allusers")
    public @ResponseBody Iterable<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @GetMapping(value = "/unblockuser")
    public void unblockUser(@RequestParam int userId){
        userRepository.unblockUser(userId);
    }

    @GetMapping(value = "/blockuser")
    public void blockUser(@RequestParam int userId){
        userRepository.blockUser(userId);
    }

    @GetMapping(value = "/edituser")
    public void editUser(@RequestParam int userId, @RequestParam String name,@RequestParam String surname, @RequestParam String username,
                         @RequestParam String email_address, @RequestParam String identity_number ,@RequestParam Integer status,
                         @RequestParam Integer accepted ,@RequestParam Integer role){
        User user = userRepository.findById(userId).orElse(null);
        user.setName(name);
        user.setSurname(surname);
        user.setUsername(username);
        user.setEmail_address(email_address);
        user.setIdentity_number(identity_number);
        user.setStatus(status);
        user.setAccepted(accepted);
        user.setRole(role);
        userRepository.save(user);
    }

    @PostMapping(value = "/adduser", consumes = {"*/*"})
    public void addUser(@RequestParam String name, @RequestParam String surname,
                        @RequestParam String username, @RequestParam String password,
                        @RequestParam String email_address, @RequestParam int role,
                        @RequestParam String identity_number){

        User newUser = new User();
        newUser.setName(name);
        newUser.setSurname(surname);
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setEmail_address(email_address);
        newUser.setRole(role);
        newUser.setIdentity_number(identity_number);
        newUser.setStatus(1);
        newUser.setAccepted(1);
        userRepository.save(newUser);
    }

}