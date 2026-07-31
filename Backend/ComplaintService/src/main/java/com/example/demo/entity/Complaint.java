package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    private int uid;

    private int deptId;

    private int lid;

    private String addProblemArea;

    private String description;

    private LocalDate complaintDate;

    private LocalDateTime sinceWhen;

    private String status;

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
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

	public String getAddProblemArea() {
		return addProblemArea;
	}

	public void setAddProblemArea(String addProblemArea) {
		this.addProblemArea = addProblemArea;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getComplaintDate() {
		return complaintDate;
	}

	public void setComplaintDate(LocalDate complaintDate) {
		this.complaintDate = complaintDate;
	}

	public LocalDateTime getSinceWhen() {
		return sinceWhen;
	}

	public void setSinceWhen(LocalDateTime sinceWhen) {
		this.sinceWhen = sinceWhen;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    
}