package com.example.demo.dto;

public class FeedbackDTO {

    private int uid;

    private int cid;

    private String textbox;

    public FeedbackDTO() {
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public String getTextbox() {
        return textbox;
    }

    public void setTextbox(String textbox) {
        this.textbox = textbox;
    }
}