package com.flatapp.booking_service.controller;

import com.flatapp.booking_service.model.Booking;
import com.flatapp.booking_service.service.BookingService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService service;

    @Value("${app.jwt.secret}") private String secret;

    public BookingController(BookingService service) { this.service = service; }

    private String emailFrom(String bearer) {
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(bearer.replace("Bearer ","")).getBody().getSubject();
    }

    @PostMapping
    public ResponseEntity<Booking> create(@RequestHeader("Authorization") String bearer,
                                          @RequestBody Map<String,Long> body) {
        String email = emailFrom(bearer);
        Long propertyId = body.get("propertyId");
        return ResponseEntity.ok(service.create(propertyId, email, bearer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancel(@RequestHeader("Authorization") String bearer,
                                         @PathVariable Long id) {
        String email = emailFrom(bearer);
        service.cancel(id, email, bearer);
        return ResponseEntity.ok("Cancelled");
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Booking>> mine(@RequestHeader("Authorization") String bearer) {
        String email = emailFrom(bearer);
        return ResponseEntity.ok(service.myBookings(email));
    }
}
