package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CitizenRegistrationDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.NgoRegistrationDTO;
import com.example.demo.dto.OfficerRegistrationDTO;
import com.example.demo.entity.Department;
import com.example.demo.entity.Ngo;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.NgoRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private NgoRepository ngoRepository;

    public LoginResponseDTO login(String uname, String password) {

        System.out.println("Username = " + uname);
        System.out.println("Password = " + password);

        User user = userRepository.findByUnameAndPassword(uname, password);

        if (user == null) {
            throw new RuntimeException("Invalid Username or Password");
        }

        Ngo ngo = null;   // <-- IMPORTANT

        if (user.getRole().getRid() == 3) {

            ngo = ngoRepository.findByUser(user);

            System.out.println("NGO = " + ngo);

            if (ngo == null) {
                throw new RuntimeException("NGO details not found.");
            }

            System.out.println("NGO ID = " + ngo.getNgoId());

            if ("PENDING".equalsIgnoreCase(ngo.getApprovalStatus())) {
                throw new RuntimeException("Your NGO registration is pending admin approval.");
            }

            if ("REJECTED".equalsIgnoreCase(ngo.getApprovalStatus())) {
                throw new RuntimeException("Your NGO registration has been rejected by the admin.");
            }
        }

        LoginResponseDTO response = new LoginResponseDTO();

        response.setUid(user.getUid());
        response.setRid(user.getRole().getRid());
        response.setFullname(user.getFullname());

        // ADD THIS
        if (ngo != null) {
            response.setNgoId(ngo.getNgoId());
        }

        // Officer Login
        if (user.getRole().getRid() == 4) {

            Department dept =
                    departmentRepository.findByOfficerName(user.getFullname());

            if (dept != null) {
                response.setDeptId(dept.getDeptId());
            }
        }

        return response;
    }

    public User registerOfficer(OfficerRegistrationDTO dto) {

        Role role = roleRepository.findById(4)
                .orElseThrow(() ->
                        new RuntimeException("Officer Role Not Found"));

        User user = new User();

        user.setUname(dto.getUname());
        user.setPassword(dto.getPassword());
        user.setFullname(dto.getFullname());
        user.setAddress(dto.getAddress());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setRole(role);

        User savedUser = userRepository.save(user);

        Department department = departmentRepository.findById(dto.getDeptId())
                .orElseThrow(() ->
                        new RuntimeException("Department Not Found"));

        department.setOfficerName(dto.getFullname());
        department.setPhone(dto.getPhone());
        department.setEmail(dto.getEmail());

        departmentRepository.save(department);

        return savedUser;
    }

    public User registerNgo(NgoRegistrationDTO dto) {

        Role role = roleRepository.findById(3)
                .orElseThrow(() ->
                        new RuntimeException("NGO Role Not Found"));

        User user = new User();

        user.setUname(dto.getUname());
        user.setPassword(dto.getPassword());
        user.setFullname(dto.getNgoName());
        user.setAddress(dto.getAddress());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setRole(role);

        User savedUser = userRepository.save(user);

        Ngo ngo = new Ngo();

        ngo.setNgoName(dto.getNgoName());
        ngo.setRegNo(dto.getRegNo());
        ngo.setAddress(dto.getAddress());
        ngo.setPhone(dto.getPhone());
        ngo.setEmail(dto.getEmail());

        // Default status
        ngo.setApprovalStatus("PENDING");

        ngo.setUser(savedUser);

        ngoRepository.save(ngo);

        return savedUser;
    }

    public List<Ngo> getPendingNgos() {
        return ngoRepository.findByApprovalStatus("PENDING");
    }

    public String approveNgo(int ngoId) {

        Ngo ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new RuntimeException("NGO Not Found"));

        ngo.setApprovalStatus("APPROVED");

        ngoRepository.save(ngo);

        return "NGO Approved Successfully";
    }

    public String rejectNgo(int ngoId) {

        Ngo ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new RuntimeException("NGO Not Found"));

        ngo.setApprovalStatus("REJECTED");

        ngoRepository.save(ngo);

        return "NGO Rejected Successfully";
    }
    public String registerCitizen(CitizenRegistrationDTO dto) {

        // Username check
        if(userRepository.findByUname(dto.getUname()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Email check
        if(userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Phone validation
        if(dto.getPhone() == null ||
           !dto.getPhone().matches("\\d{10}")) {
            throw new RuntimeException("Phone number must be 10 digits");
        }

        // Password validation
        if(dto.getPassword() == null ||
           dto.getPassword().length() < 6) {
            throw new RuntimeException("Password must contain at least 6 characters");
        }

        Role role = roleRepository.findById(2)
                .orElseThrow(() ->
                        new RuntimeException("Citizen Role Not Found"));

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