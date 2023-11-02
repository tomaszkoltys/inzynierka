package com.example.demo.config;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Collections;

@Repository
@RequiredArgsConstructor
public class SecurityHelper {

    private final UserRepository userRepository;

    public UserDetails findUserByUsername(String username) {
        var userFromDb = userRepository.findByUsername(username).orElse(null);
        return convertToUserDetails(userFromDb);
    }

    private UserDetails convertToUserDetails(User user) {
        if (user == null) {
            throw new UsernameNotFoundException("No user with given username was found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRole() == 1 ? Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")) : Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
