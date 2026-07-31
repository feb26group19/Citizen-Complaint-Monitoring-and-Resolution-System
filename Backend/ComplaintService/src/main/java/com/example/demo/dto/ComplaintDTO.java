package com.example.demo.dto;

import java.time.LocalDateTime;

public class ComplaintDTO {

    private int uid;
    private int deptId;
    private int lid;
    private String addProblemArea;
    private String description;
    private LocalDateTime sinceWhen;
	public LocalDateTime getSinceWhen() {
		return sinceWhen;
	}
	public void setSinceWhen(LocalDateTime sinceWhen) {
		this.sinceWhen = sinceWhen;
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

    
}