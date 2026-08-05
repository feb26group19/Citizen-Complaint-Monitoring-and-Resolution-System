package com.example.demo.dto;

import java.time.LocalDateTime;

public class EventDTO {
    private Integer ngoId;
    private LocalDateTime date;
    private Integer lid;
    private String areaDetail;
    private String eventText;

    // Getters and Setters
    public Integer getNgoId() { return ngoId; }
    public void setNgoId(Integer ngoId) { this.ngoId = ngoId; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public Integer getLid() { return lid; }
    public void setLid(Integer lid) { this.lid = lid; }

    public String getAreaDetail() { return areaDetail; }
    public void setAreaDetail(String areaDetail) { this.areaDetail = areaDetail; }

    public String getEventText() { return eventText; }
    public void setEventText(String eventText) { this.eventText = eventText; }
}