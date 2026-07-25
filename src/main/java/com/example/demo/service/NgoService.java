package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.NgoDTO;
import com.example.demo.entity.Ngo;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.NgoRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
@Service
public class NgoService{
@Autowired
private RoleRepository roleRepository;

@Autowired
private NgoRepository ngoRepository;
@Autowired
private UserRepository userRepository;

public String registerNgo(NgoDTO dto)
{
    // NGO Role (rid = 3)
    Role role = roleRepository.findById(3)
            .orElseThrow(() ->
                    new RuntimeException("NGO Role Not Found"));

    // Save User
    User user = new User();

    user.setUname(dto.getUname());
    user.setPassword(dto.getPassword());

    // NGO name stored as fullname
    user.setFullname(dto.getNgoName());

    user.setAddress(dto.getAddress());
    user.setPhone(dto.getPhone());
    user.setEmail(dto.getEmail());

    user.setRole(role);

    User savedUser = userRepository.save(user);

    // Save NGO
    Ngo ngo = new Ngo();

    ngo.setNgoName(dto.getNgoName());
    ngo.setRegNo(dto.getRegNo());

    ngo.setAddress(dto.getAddress());
    ngo.setPhone(dto.getPhone());
    ngo.setEmail(dto.getEmail());

    ngo.setUser(savedUser);

    ngoRepository.save(ngo);

    return "NGO Registered Successfully";
}
}

