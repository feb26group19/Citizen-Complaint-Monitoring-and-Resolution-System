package com.example.demo.services;

import com.example.demo.dto.EventDTO;
import com.example.demo.dto.EventRegistrationDTO;
import com.example.demo.entity.Event;
import com.example.demo.entity.EventRegistration;
import com.example.demo.repository.EventRegistrationRepository;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventRegistrationRepository registrationRepository;

    // 1. NGO creates an event (Defaults status to PENDING)
    public Event createEvent(EventDTO dto) {
        Event event = new Event(
            dto.getNgoId(),
            dto.getDate(),
            dto.getLid(),
            dto.getAreaDetail(),
            dto.getEventText()
        );
        event.setStatus("PENDING");
        return eventRepository.save(event);
    }

    // 2. Fetch all events (For Admin review)
    public List<Event> getAllEventsForAdmin() {
        return eventRepository.findAll();
    }

    // 3. Fetch ONLY APPROVED events (For Citizens to view & register)
    public List<Event> getApprovedEvents() {
        return eventRepository.findByStatus("APPROVED");
    }

    // 4. Fetch all events created by a specific NGO (For NGO Dashboard status tracking)
    public List<Event> getEventsByNgo(Integer ngoId) {
        return eventRepository.findByNgoId(ngoId);
    }

    // 5. Admin Approve or Reject an event
    public Event updateEventStatus(Integer eid, String status) {
        Event event = eventRepository.findById(eid)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eid));

        event.setStatus(status.toUpperCase()); // APPROVED or REJECTED
        return eventRepository.save(event);
    }

    // 6. Citizen Registers for an event
    public EventRegistration registerCitizen(EventRegistrationDTO dto) {
        Event event = eventRepository.findById(dto.getEid())
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + dto.getEid()));

        if (!"APPROVED".equalsIgnoreCase(event.getStatus())) {
            throw new RuntimeException("Cannot register for an event that is not APPROVED.");
        }

        if (registrationRepository.existsByEidAndUid(dto.getEid(), dto.getUid())) {
            throw new RuntimeException("User (uid: " + dto.getUid() + ") is already registered for event (eid: " + dto.getEid() + ").");
        }

        LocalDate registrationDate = (dto.getRegDate() != null) ? dto.getRegDate() : LocalDate.now();

        EventRegistration reg = new EventRegistration(
            dto.getEid(),
            dto.getUid(),
            registrationDate
        );

        return registrationRepository.save(reg);
    }

    // 7. Fetch registrations by citizen
    public List<EventRegistration> getRegistrationsByUser(Integer uid) {
        return registrationRepository.findByUid(uid);
    }

    // 8. Fetch registrations by event
    public List<EventRegistration> getRegistrationsByEvent(Integer eid) {
        return registrationRepository.findByEid(eid);
    }
}