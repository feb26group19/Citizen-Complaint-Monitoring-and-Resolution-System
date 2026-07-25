package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Check if username already exists
    boolean existsByUname(String uname);

    // Login
    User findByUnameAndPassword(String uname, String password);

    // Find user by username
    Optional<User> findByUname(String uname);

    // Find user by email
    Optional<User> findByEmail(String email);

}