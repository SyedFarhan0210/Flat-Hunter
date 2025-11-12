package com.flatapp.property_service.controller;

import com.flatapp.property_service.model.Property;
import com.flatapp.property_service.service.PropertyService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/properties")
public class PropertyController {

    private final PropertyService service;

    @Value("${app.jwt.secret}")
    private String secret;

    public PropertyController(PropertyService service) {
        this.service = service;
    }

    private String extractEmail(String token) {
    Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token.replace("Bearer ", ""))
            .getBody()
            .getSubject();
}

    // 🏠 Create new property listing
    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody Property property,
                                         @RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.addProperty(property, email));
    }

    // 📋 Get all listings
    @GetMapping
    public ResponseEntity<List<Property>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔍 Get a single property by ID (NEW)
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return service.getAll().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body("Property not found"));
    }

    // 🌆 Filter by city
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Property>> getByCity(@PathVariable String city) {
        return ResponseEntity.ok(service.getByCity(city));
    }

    // 📍 Filter by address substring
    @GetMapping("/address/{address}")
    public ResponseEntity<List<Property>> getByAddress(@PathVariable String address) {
        return ResponseEntity.ok(service.getByAddress(address));
    }

    // 👤 Get properties listed by current user
    @GetMapping("/mine")
    public ResponseEntity<List<Property>> getMyProperties(@RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.getByOwner(email));
    }

    // ✏️ Update a property listing
    @PutMapping("/{id}")
    public ResponseEntity<Property> update(@PathVariable Long id,
                                           @RequestBody Property property,
                                           @RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.updateProperty(id, property, email));
    }

    // ❌ Delete a property listing
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         @RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        service.deleteProperty(id, email);
        return ResponseEntity.ok("Property deleted successfully");
    }

    // Reserve 1 slot (requires Bearer token)
@PutMapping("/{id}/reserve")
public ResponseEntity<?> reserve(@PathVariable Long id,
                                 @RequestHeader("Authorization") String token) {
    boolean ok = service.reserveSlot(id);
    if (!ok) return ResponseEntity.status(409).body("Property is full");
    return ResponseEntity.ok("Reserved");
}

// Release 1 slot (used on cancellation/compensation)
@PutMapping("/{id}/release")
public ResponseEntity<?> release(@PathVariable Long id,
                                 @RequestHeader("Authorization") String token) {
    service.releaseSlot(id);
    return ResponseEntity.ok("Released");
}

}
