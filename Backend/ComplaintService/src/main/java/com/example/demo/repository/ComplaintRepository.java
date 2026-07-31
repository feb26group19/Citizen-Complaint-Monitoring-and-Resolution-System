package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Complaint;

public interface ComplaintRepository
        extends JpaRepository<Complaint,Integer>{

    List<Complaint> findByUid(int uid);

    List<Complaint> findByDeptId(int deptId);
}