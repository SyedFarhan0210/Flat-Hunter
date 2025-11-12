package com.flatapp.booking_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)  private Long propertyId;
    @Column(nullable = false)  private String userEmail;
    @Column(nullable = false)  private String status; // BOOKED / CANCELLED
    @Column(nullable = false)  private Instant createdAt;
}
