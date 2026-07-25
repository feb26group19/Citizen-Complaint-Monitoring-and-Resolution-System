package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Ngo;

public interface NgoRepository extends JpaRepository<Ngo, Integer> {

}