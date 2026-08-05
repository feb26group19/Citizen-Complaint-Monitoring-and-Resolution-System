package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.CitizenRegistrationDTO;
import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.NgoRegistrationDTO;
import com.example.demo.dto.OfficerRegistrationDTO;
import com.example.demo.entity.Ngo;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO request) {

        try {

            LoginResponseDTO response =
                    userService.login(
                            request.getUname(),
                            request.getPassword());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/registerOfficer")
    public User registerOfficer(
            @RequestBody OfficerRegistrationDTO dto) {

        return userService.registerOfficer(dto);
    }

    @PostMapping("/registerNgo")
    public User registerNgo(
            @RequestBody NgoRegistrationDTO dto) {

        return userService.registerNgo(dto);
    }

    @GetMapping("/pending-ngos")
    public List<Ngo> getPendingNgos() {

        return userService.getPendingNgos();
    }

    @PutMapping("/approve-ngo/{ngoId}")
    public String approveNgo(
            @PathVariable int ngoId) {

        return userService.approveNgo(ngoId);
    }

    @PutMapping("/reject-ngo/{ngoId}")
    public String rejectNgo(
            @PathVariable int ngoId) {

        return userService.rejectNgo(ngoId);
    }
    @PostMapping("/registerCitizen")
    public ResponseEntity<?> registerCitizen(
            @RequestBody CitizenRegistrationDTO dto) {

        try {

            String message =
                    userService.registerCitizen(dto);

            return ResponseEntity.ok(message);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}