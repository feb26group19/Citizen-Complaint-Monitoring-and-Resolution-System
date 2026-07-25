package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public String registerUser(UserDTO dto) {

        // Citizen Role (Assuming rid = 2)
        Role role = roleRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Citizen Role Not Found"));

        User user = new User();

        user.setUname(dto.getUname());
        user.setPassword(dto.getPassword());
        user.setFullname(dto.getFullname());
        user.setAddress(dto.getAddress());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());

        user.setRole(role);

        userRepository.save(user);

        return "Citizen Registered Successfully";
    }
}