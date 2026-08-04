package com.example.demo.controller;

import com.example.demo.dto.EventDTO;
import com.example.demo.dto.EventRegistrationDTO;
import com.example.demo.entity.Event;
import com.example.demo.entity.EventRegistration;
import com.example.demo.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // 1. NGO creates an event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody EventDTO dto) {
        Event createdEvent = eventService.createEvent(dto);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    // 2. Fetch ONLY APPROVED events (For Citizens)
    @GetMapping("/approved")
    public ResponseEntity<List<Event>> getApprovedEvents() {
        return ResponseEntity.ok(eventService.getApprovedEvents());
    }

    // 3. Fetch ALL events (For Admin Dashboard Approval Table)
    @GetMapping("/admin/all")
    public ResponseEntity<List<Event>> getAllEventsForAdmin() {
        return ResponseEntity.ok(eventService.getAllEventsForAdmin());
    }

    // 4. Fetch all events for a specific NGO (For NGO Dashboard)
    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<Event>> getEventsByNgo(@PathVariable Integer ngoId) {
        return ResponseEntity.ok(eventService.getEventsByNgo(ngoId));
    }

    // 5. Admin endpoint: Approve or Reject an event
    @PutMapping("/{eid}/status")
    public ResponseEntity<Event> updateEventStatus(
            @PathVariable Integer eid,
            @RequestParam String status) {
        Event updatedEvent = eventService.updateEventStatus(eid, status);
        return ResponseEntity.ok(updatedEvent);
    }

    // 6. Citizen registers for an event
    @PostMapping("/register")
    public ResponseEntity<?> registerCitizen(@RequestBody EventRegistrationDTO dto) {
        try {
            EventRegistration registration = eventService.registerCitizen(dto);
            return new ResponseEntity<>(registration, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 7. Fetch all event registrations by user
    @GetMapping("/registrations/user/{uid}")
    public ResponseEntity<List<EventRegistration>> getRegistrationsByUser(@PathVariable Integer uid) {
        return ResponseEntity.ok(eventService.getRegistrationsByUser(uid));
    }

    // 8. Fetch all citizen registrations for a specific event
    @GetMapping("/registrations/event/{eid}")
    public ResponseEntity<List<EventRegistration>> getRegistrationsByEvent(@PathVariable Integer eid) {
        return ResponseEntity.ok(eventService.getRegistrationsByEvent(eid));
    }
}