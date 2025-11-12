package com.flatapp.property_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ownerEmail;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    private Double rent;
    private String propertyType;  // e.g., 1BHK, 2BHK, PG
    private Boolean furnished;
    private String availableFrom;
    private String contactNumber;

    // 👇 New occupancy fields
    private Integer maxOccupancy;        // how many people the owner wants in
    private Integer currentOccupancy = 0; // defaults to 0 when listed
}
