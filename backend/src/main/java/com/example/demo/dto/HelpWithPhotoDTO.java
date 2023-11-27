package com.example.demo.dto;

import com.example.demo.entities.Help;

public record HelpWithPhotoDTO(Help help, byte[] photo) {

}
