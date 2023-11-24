package com.example.demo.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Nonnull
    private String name;
    @Nonnull
    private String surname;
    @Nonnull
    private String username;
    @Nonnull
    private String password;
    @Nonnull
    private String email_address;
    @Nonnull
    private int role;
    @Nonnull
    private String identity_number;
    @Nonnull
    private int account_status;
    private int accepted;
    private float average_rating;
    private int rating_count;
    private Integer reset_password_code;
}

