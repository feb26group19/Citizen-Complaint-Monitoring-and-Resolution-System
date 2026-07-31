package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Ngo;
import com.example.demo.repository.NgoRepository;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    NgoRepository ngoRepo;

    @GetMapping("/pendingNgos")
    public List<Ngo> getPendingNgos()
    {
        return ngoRepo.findByApprovalStatus("PENDING");
    }

    @PutMapping("/approve/{id}")
    public String approveNgo(@PathVariable int id)
    {
        Ngo ngo = ngoRepo.findById(id).get();

        ngo.setApprovalStatus("APPROVED");

        ngoRepo.save(ngo);

        return "NGO Approved Successfully";
    }

    @PutMapping("/reject/{id}")
    public String rejectNgo(@PathVariable int id)
    {
        Ngo ngo = ngoRepo.findById(id).get();

        ngo.setApprovalStatus("REJECTED");

        ngoRepo.save(ngo);

        return "NGO Rejected";
    }

}
