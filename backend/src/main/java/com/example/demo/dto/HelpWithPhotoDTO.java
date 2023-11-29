package com.example.demo.dto;

import com.example.demo.entities.Help;

public record HelpWithPhotoDTO(Integer id, int county, String description, byte[] photo, int side, int author, Integer supporter, int helpStatus, int type) {

}
