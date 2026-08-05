package com.example.demo.dto;

public class LoginResponseDTO {

    private int uid;
    private int rid;
    private String fullname;
    private int deptId;
    private int ngoId;     // <-- NEW FIELD

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getRid() {
        return rid;
    }

    public void setRid(int rid) {
        this.rid = rid;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    // NEW
    public int getNgoId() {
        return ngoId;
    }

    public void setNgoId(int ngoId) {
        this.ngoId = ngoId;
    }
}