package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "event_registration")
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "er_id")
    private Integer erId;

    @Column(name = "eid", nullable = false)
    private Integer eid;

    @Column(name = "uid", nullable = false)
    private Integer uid;

    @Column(name = "reg_date", nullable = false)
    private LocalDate regDate;

    public EventRegistration() {}

    public EventRegistration(Integer eid, Integer uid, LocalDate regDate) {
        this.eid = eid;
        this.uid = uid;
        this.regDate = regDate;
    }

    // Getters and Setters
    public Integer getErId() { return erId; }
    public void setErId(Integer erId) { this.erId = erId; }

    public Integer getEid() { return eid; }
    public void setEid(Integer eid) { this.eid = eid; }

    public Integer getUid() { return uid; }
    public void setUid(Integer uid) { this.uid = uid; }

    public LocalDate getRegDate() { return regDate; }
    public void setRegDate(LocalDate regDate) { this.regDate = regDate; }
}