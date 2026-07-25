package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NgoDTO;
import com.example.demo.service.NgoService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class NgoController {

    @Autowired
    private NgoService ngoService;

    @PostMapping("/registerNgo")
    public String registerNgo(@RequestBody NgoDTO dto) {

        return ngoService.registerNgo(dto);
    }
}