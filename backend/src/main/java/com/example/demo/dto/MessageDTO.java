package com.example.demo.dto;

public record MessageDTO(EmailDTO to, String template, DataDTO data) {

}
