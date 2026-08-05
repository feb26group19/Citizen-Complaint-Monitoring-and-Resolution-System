package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Ngo;
import com.example.demo.entity.User;

public interface NgoRepository extends JpaRepository<Ngo, Integer> {
	

    Ngo findByUser(User user);

    List<Ngo> findByApprovalStatus(String approvalStatus);

}