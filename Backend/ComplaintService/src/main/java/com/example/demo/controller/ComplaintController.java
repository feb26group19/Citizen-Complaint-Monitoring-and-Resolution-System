package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ComplaintDTO;
import com.example.demo.dto.StatusUpdateDTO;
import com.example.demo.entity.Complaint;
import com.example.demo.service.ComplaintService;

import com.example.demo.dto.FeedbackDTO;
import com.example.demo.entity.Feedback;

@RestController
@RequestMapping("/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;


    @PostMapping("/register")
    public String registerComplaint(
            @RequestBody ComplaintDTO dto)
    {
        return complaintService.registerComplaint(dto);
    }

    @GetMapping("/user/{uid}")
    public List<Complaint> getUserComplaints(
            @PathVariable int uid)
    {
        return complaintService.getUserComplaints(uid);
    }

    @GetMapping
    public List<Complaint> getAllComplaints()
    {
        return complaintService.getAllComplaints();
    }

    @PutMapping("/status")
    public String updateStatus(
            @RequestBody StatusUpdateDTO dto)
    {
        return complaintService.updateStatus(dto);
    }
    @GetMapping("/department/{deptId}")
    public List<Complaint> getDepartmentComplaints(
            @PathVariable int deptId)
    {
        return complaintService.getDepartmentComplaints(deptId);
    }
    @PostMapping("/feedback")
    public String submitFeedback(@RequestBody FeedbackDTO dto) {
        return complaintService.addFeedback(dto);
    }
    @GetMapping("/feedback/all")
    public List<Feedback> getAllFeedback() {
        return complaintService.getAllFeedback();
    }
    @GetMapping("/feedback/officer/{deptId}")
    public List<Feedback> getOfficerFeedback(@PathVariable int deptId) {
        return complaintService.getDepartmentFeedback(deptId);
    }
    
}
