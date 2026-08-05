package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eid")
    private Integer eid;

    @Column(name = "ngo_id", nullable = false)
    private Integer ngoId;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "lid", nullable = false)
    private Integer lid;

    @Column(name = "area_detail", length = 40, nullable = false)
    private String areaDetail;

    @Column(name = "event_text", length = 40, nullable = false)
    private String eventText;

    @Column(name = "status", length = 20, nullable = false)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED

    public Event() {}

    public Event(Integer ngoId, LocalDateTime date, Integer lid, String areaDetail, String eventText) {
        this.ngoId = ngoId;
        this.date = date;
        this.lid = lid;
        this.areaDetail = areaDetail;
        this.eventText = eventText;
        this.status = "PENDING";
    }

    // Getters and Setters
    public Integer getEid() { return eid; }
    public void setEid(Integer eid) { this.eid = eid; }

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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}