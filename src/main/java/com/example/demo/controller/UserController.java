package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.OfficerRegistrationDTO;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        return userService.login(
                request.getUname(),
                request.getPassword());
    }
    @PostMapping("/registerOfficer")
    public User registerOfficer(@RequestBody OfficerRegistrationDTO dto) {

        return userService.registerOfficer(dto);

    }
}