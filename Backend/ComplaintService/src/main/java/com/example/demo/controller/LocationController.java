package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Location;
import com.example.demo.repository.LocationRepository;

@RestController
@RequestMapping("/location")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/all")
    public List<Location> getAllLocations() {

        return locationRepository.findAll();
    }
}