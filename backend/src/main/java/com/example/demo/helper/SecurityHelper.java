package com.example.demo.helper;

import com.example.demo.dto.UserDetailsDTO;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import com.google.common.hash.Hashing;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Repository
@RequiredArgsConstructor
public class SecurityHelper {

    private final UserRepository userRepository;

    public UserDetailsDTO findUserByUsername(String username) {
        var userFromDb = userRepository.findByUsername(username).orElse(null);
        return convertToUserDetails(userFromDb);
    }

    private UserDetailsDTO convertToUserDetails(User user) {
        if (user == null) {
            throw new UsernameNotFoundException("No user with given username was found");
        }

        var userDetailsAuthority = switch (user.getRole()) {
            case 1 -> Collections.singleton(new SimpleGrantedAuthority("ROLE_REFUGEE"));
            case 2 -> Collections.singleton(new SimpleGrantedAuthority("ROLE_VOLUNTEER"));
            case 3 -> Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"));
            default -> throw new IllegalStateException("Unexpected value: " + user.getRole());
        };

        return new UserDetailsDTO(user.getId(), new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                userDetailsAuthority
        ));
    }

    public static String hashPassword(String password) {
        return Hashing.sha256()
                .hashString(password, StandardCharsets.UTF_8)
                .toString();
    }
}
