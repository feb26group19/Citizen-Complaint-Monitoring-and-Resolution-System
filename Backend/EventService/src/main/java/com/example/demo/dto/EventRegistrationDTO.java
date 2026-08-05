package com.example.demo.dto;

import java.time.LocalDate;

public class EventRegistrationDTO {
    private Integer eid;
    private Integer uid;
    private LocalDate regDate;

    // Getters and Setters
    public Integer getEid() { return eid; }
    public void setEid(Integer eid) { this.eid = eid; }

    public Integer getUid() { return uid; }
    public void setUid(Integer uid) { this.uid = uid; }

    public LocalDate getRegDate() { return regDate; }
    public void setRegDate(LocalDate regDate) { this.regDate = regDate; }
}