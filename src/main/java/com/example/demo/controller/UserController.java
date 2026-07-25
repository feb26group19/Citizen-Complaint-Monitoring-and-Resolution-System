package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.OfficerRegistrationDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Citizen Registration
    @PostMapping("/registerCitizen")
    public String registerCitizen(@RequestBody UserDTO dto) {

        return userService.registerUser(dto);
    }

    // Login
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        return userService.login(
                request.getUname(),
                request.getPassword());
    }

    // Officer Registration
    @PostMapping("/registerOfficer")
    public User registerOfficer(@RequestBody OfficerRegistrationDTO dto) {

        return userService.registerOfficer(dto);
    }
}