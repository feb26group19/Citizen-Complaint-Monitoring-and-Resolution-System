package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.OfficerRegistrationDTO;
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

    public LoginResponseDTO login(String uname, String password) {

        User user = userRepository.findByUnameAndPassword(uname, password);

        if(user == null) {
            throw new RuntimeException("Invalid Username or Password");
        }

        LoginResponseDTO response = new LoginResponseDTO();

        response.setUid(user.getUid());
        response.setRid(user.getRole().getRid());
        response.setFullname(user.getFullname());

        return response;
    }
    public User registerOfficer(OfficerRegistrationDTO dto) {

        Role role = roleRepository.findById(4)
                .orElseThrow(() -> new RuntimeException("Officer Role Not Found"));

        User user = new User();

        user.setUname(dto.getUname());
        user.setPassword(dto.getPassword());
        user.setFullname(dto.getFullname());
        user.setAddress(dto.getAddress());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());

        // Assign Officer Role
        user.setRole(role);

        return userRepository.save(user);
    }
    
}