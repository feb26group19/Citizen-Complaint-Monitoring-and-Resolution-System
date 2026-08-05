package com.example.demo.repository;

import com.example.demo.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Integer> {
    boolean existsByEidAndUid(Integer eid, Integer uid);
    List<EventRegistration> findByUid(Integer uid);
    List<EventRegistration> findByEid(Integer eid);
}