package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @Column(name = "lid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lid;

    @Column(name = "name")
    private String name;

    public Location() {
    }

    public int getLid() {
        return lid;
    }

    public void setLid(int lid) {
        this.lid = lid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}