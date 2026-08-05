package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ComplaintDTO;
import com.example.demo.dto.FeedbackDTO;
import com.example.demo.dto.StatusUpdateDTO;
import com.example.demo.entity.Complaint;
import com.example.demo.entity.Feedback;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.FeedbackRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;


    public String registerComplaint(ComplaintDTO dto) {

        Complaint c = new Complaint();

        c.setUid(dto.getUid());
        c.setDeptId(dto.getDeptId());
        c.setLid(dto.getLid());
        c.setAddProblemArea(dto.getAddProblemArea());
        c.setDescription(dto.getDescription());

        c.setComplaintDate(LocalDate.now());
        c.setSinceWhen(LocalDateTime.now());

        c.setStatus("Pending");

        complaintRepository.save(c);

        return "Complaint Registered Successfully";
    }


    public List<Complaint> getUserComplaints(int uid) {
        return complaintRepository.findByUid(uid);
    }


    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }


    public List<Complaint> getDepartmentComplaints(int deptId) {
        return complaintRepository.findByDeptId(deptId);
    }


    public String updateStatus(StatusUpdateDTO dto) {

        Complaint c =
                complaintRepository.findById(dto.getCid())
                .orElseThrow(() ->
                        new RuntimeException("Complaint Not Found"));

        c.setStatus(dto.getStatus());

        complaintRepository.save(c);

        return "Status Updated";
    }


    // Citizen gives feedback
    public String addFeedback(FeedbackDTO dto) {

        Complaint complaint =
                complaintRepository.findById(dto.getCid())
                .orElseThrow(() ->
                        new RuntimeException("Complaint Not Found"));


        // Check complaint belongs to citizen
        if (complaint.getUid() != dto.getUid()) {
            throw new RuntimeException(
                    "You can give feedback only for your own complaint.");
        }


        // Check complaint is resolved
        if (!"Resolved".equalsIgnoreCase(complaint.getStatus())) {
            throw new RuntimeException(
                    "Feedback can only be submitted after complaint is resolved.");
        }


        // Prevent duplicate feedback
        if (feedbackRepository.findByCid(dto.getCid()).isPresent()) {
            throw new RuntimeException(
                    "Feedback already submitted.");
        }


        Feedback feedback = new Feedback();

        feedback.setUid(dto.getUid());
        feedback.setCid(dto.getCid());
        feedback.setTextbox(dto.getTextbox());
        feedback.setFeedbackDate(LocalDate.now());

        feedbackRepository.save(feedback);


        return "Feedback submitted successfully.";
    }


    // Admin view all feedback
    public List<Feedback> getAllFeedback() {

        return feedbackRepository.findAll();
    }


    // Citizen view own feedback
    public List<Feedback> getMyFeedback(int uid) {

        return feedbackRepository.findByUid(uid);
    }


    // Officer view feedback of his department complaints
    public List<Feedback> getDepartmentFeedback(int deptId) {

        List<Complaint> complaints =
                complaintRepository.findByDeptId(deptId);


        List<Feedback> feedbackList = new ArrayList<>();


        for (Complaint complaint : complaints) {

            feedbackRepository.findByCid(complaint.getCid())
                    .ifPresent(feedbackList::add);
        }


        return feedbackList;
    }
}