package com.example.demo.dto;

import java.util.List;

public record MessageDTO(EmailDTO to, String template, DataDTO data) {

}
