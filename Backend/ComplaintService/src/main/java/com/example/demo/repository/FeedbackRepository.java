package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    

	Optional<Feedback> findByCid(int cid);
    List<Feedback> findByUid(int uid);

    List<Feedback> findByCidIn(List<Integer> cids);
}