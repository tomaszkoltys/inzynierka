package com.example.demo.dto;

import org.springframework.security.core.userdetails.UserDetails;

public record UserDetailsDTO(Integer userId, UserDetails userDetails) {
}
