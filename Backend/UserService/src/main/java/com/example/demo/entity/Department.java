package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="department")
public class Department {

    @Id
    @Column(name="dept_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deptId;

    private String name;

    @Column(name="officer_name")
    private String officerName;

    private String phone;

    private String email;

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOfficerName() {
        return officerName;
    }

    public void setOfficerName(String officerName) {
        this.officerName = officerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
