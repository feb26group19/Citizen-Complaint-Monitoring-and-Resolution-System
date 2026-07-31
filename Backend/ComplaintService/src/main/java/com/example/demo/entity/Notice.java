package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nid;

    @Column(name = "dept_id")
    private int deptId;

    @Column(name = "lid")
    private int lid;

    @Column(name = "area_name")
    private String areaName;

    @Column(name = "notice_text")
    private String noticeText;

    @Column(name = "date")
    private LocalDate date;

    public int getNid() {
        return nid;
    }

    public void setNid(int nid) {
        this.nid = nid;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public int getLid() {
        return lid;
    }

    public void setLid(int lid) {
        this.lid = lid;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getNoticeText() {
        return noticeText;
    }

    public void setNoticeText(String noticeText) {
        this.noticeText = noticeText;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}