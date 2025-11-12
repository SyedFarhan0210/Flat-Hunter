package com.flatapp.booking_service.service;

import com.flatapp.booking_service.client.PropertyClient;
import com.flatapp.booking_service.model.Booking;
import com.flatapp.booking_service.repo.BookingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository repo;
    private final PropertyClient propertyClient;

    public BookingService(BookingRepository repo, PropertyClient propertyClient) {
        this.repo = repo;
        this.propertyClient = propertyClient;
    }

    @Transactional
    public Booking create(Long propertyId, String email, String bearerToken) {
        // Step 1: try to reserve a slot in property-service (row-locked)
        boolean ok = propertyClient.reserve(propertyId, bearerToken);
        if (!ok) throw new RuntimeException("Property is full");

        // Step 2: write booking locally
        try {
            Booking b = Booking.builder()
                    .propertyId(propertyId)
                    .userEmail(email)
                    .status("BOOKED")
                    .createdAt(Instant.now())
                    .build();
            return repo.save(b);
        } catch (RuntimeException ex) {
            // Step 3: compensation on failure
            propertyClient.release(propertyId, bearerToken);
            throw ex;
        }
    }

    @Transactional
    public void cancel(Long bookingId, String email, String bearerToken) {
        Booking b = repo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!b.getUserEmail().equals(email)) throw new RuntimeException("Unauthorized");

        if (!"CANCELLED".equals(b.getStatus())) {
            b.setStatus("CANCELLED");
            repo.save(b);
            propertyClient.release(b.getPropertyId(), bearerToken);
        }
    }

    public List<Booking> myBookings(String email) {
        return repo.findByUserEmail(email);
    }
}
