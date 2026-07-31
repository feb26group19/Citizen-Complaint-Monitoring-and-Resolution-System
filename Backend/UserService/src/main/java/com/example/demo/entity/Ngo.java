package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;                                         

@Entity
@Table(name="ngo")
public class Ngo{
	
    @Id
    @Column(name="ngo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ngoId;                                                   
                                                                        
    @Column(name="ngo_name")                                             
    private String ngoName;

    @Column(name="reg_no")
    private String regNo;

    private String address;

    private String phone;

    private String email;

    
    @Column(name="approval_status")
    private String approvalStatus;

    @OneToOne
    @JoinColumn(name="uid")
    private User user;

	public int getNgoId() {
		return ngoId;
	}

	public void setNgoId(int ngoId) {
		this.ngoId = ngoId;
	}

	public String getNgoName() {
		return ngoName;
	}

	public void setNgoName(String ngoName) {
		this.ngoName = ngoName;
	}

	public String getRegNo() {
		return regNo;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
