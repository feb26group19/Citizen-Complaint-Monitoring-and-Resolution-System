package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ComplaintDTO;
import com.example.demo.dto.StatusUpdateDTO;
import com.example.demo.entity.Complaint;
import com.example.demo.repository.ComplaintRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public String registerComplaint(ComplaintDTO dto)
    {
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

    public List<Complaint> getUserComplaints(int uid)
    {
        return complaintRepository.findByUid(uid);
    }

    public List<Complaint> getAllComplaints()
    {
        return complaintRepository.findAll();
    }
    public List<Complaint> getDepartmentComplaints(int deptId)
    {
        return complaintRepository.findByDeptId(deptId);
    }

    public String updateStatus(StatusUpdateDTO dto)
    {
        Complaint c =
                complaintRepository.findById(dto.getCid())
                .orElseThrow(() ->
                        new RuntimeException("Complaint Not Found"));

        c.setStatus(dto.getStatus());

        complaintRepository.save(c);

        return "Status Updated";
    }
}