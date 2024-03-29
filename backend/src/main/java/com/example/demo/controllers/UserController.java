package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.helper.SecurityHelper;
import com.example.demo.repositories.UserRepository;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @PostMapping(value = "/addrating")
    public void addRating(@RequestParam int ratedUserId, @RequestParam int rating){
        User ratedUser = userRepository.findUser(ratedUserId).orElse(null);
        int newRatingCount = ratedUser.getRating_count() + 1;
        float newAverageRating = (ratedUser.getAverage_rating() * ratedUser.getRating_count() + rating)/ newRatingCount;
        userRepository.addUserRating(ratedUserId, newAverageRating, newRatingCount);
    }

    @GetMapping(value = "/getrating")
    public float getRating(@RequestParam int ratedUserId){
        return userRepository.findUser(ratedUserId).orElse(null).getAverage_rating();
    }

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

    @PutMapping(value = "/edituser")
    public void editUser(@RequestParam int userId, @RequestParam String name,@RequestParam String surname, @RequestParam String username,
                         @RequestParam String email_address, @RequestParam String identity_number ,@RequestParam Integer status,
                         @RequestParam Integer accepted ,@RequestParam Integer role){
        User user = userRepository.findById(userId).orElse(null);
        user.setName(name);
        user.setSurname(surname);
        user.setUsername(username);
        user.setEmail_address(email_address);
        user.setIdentity_number(identity_number);
        user.setAccount_status(status);
        user.setAccepted(accepted);
        user.setRole(role);
        userRepository.save(user);
    }

    @PostMapping(value = "/register", consumes = {"*/*"})
    public void registerUser(@RequestParam String name, @RequestParam String surname,
                        @RequestParam String username, @RequestParam String password,
                        @RequestParam String email_address, @RequestParam int role,
                        @RequestParam String identity_number){

        if(userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already taken");

        }else {
            User newUser = new User();
            newUser.setName(name);
            newUser.setSurname(surname);
            newUser.setUsername(username);
            newUser.setPassword(SecurityHelper.hashPassword(password));
            newUser.setEmail_address(email_address);
            newUser.setRole(role);
            newUser.setIdentity_number(identity_number);
            newUser.setAccount_status(1);
            newUser.setAccepted(1);
            newUser.setRating_count(0);
            newUser.setAverage_rating(0);
            userRepository.save(newUser);
        }

    }

    @PostMapping(value = "/editpassword")
    public void registerUser(@RequestParam int userId,
                                     @RequestParam String oldPassword,
                                     @RequestParam String newPassword){

        User user = userRepository.findById(userId).orElse(null);

        if (user != null && SecurityHelper.hashPassword(oldPassword).equals(user.getPassword())) {
            user.setPassword(SecurityHelper.hashPassword(newPassword));
            userRepository.save(user);
        }
    }

    @PostMapping(value = "/deleteuser")
    public void registerUser(@RequestParam int userId){

        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            userRepository.delete(user);
        }
    }
    @PostMapping(value = "/remindpassword")
    public void remindPassword(@RequestParam String email_address){
        notificationService.sendResetPasswordNotification(email_address);
    }

    @PostMapping(value = "/resetpassword")
    public ResponseEntity<User> resetPassword(@RequestParam String email_address, @RequestParam int randomCode, @RequestParam String password) throws Exception {
        var user = userRepository.findByEmail(email_address).orElse(null);
        if(user == null){
            throw new Exception("User not found");
        }else if(user.getReset_password_code()==randomCode){
            log.info(""+user.getPassword());
            user.setPassword(SecurityHelper.hashPassword(password));
            log.info(""+user.getPassword());
            userRepository.save(user);
        }
        return ResponseEntity.of(userRepository.findByEmail(email_address));
    }

}