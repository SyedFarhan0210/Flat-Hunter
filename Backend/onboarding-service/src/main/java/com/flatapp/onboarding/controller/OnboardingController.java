package com.flatapp.onboarding.controller;

import com.flatapp.onboarding.model.OnboardProfile;
import com.flatapp.onboarding.service.OnboardingService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@RestController
@RequestMapping("/onboarding")
public class OnboardingController {

    private final OnboardingService service;
    @Value("${app.jwt.secret}")
private String secret;

    // ✅ constructor injection
    @Autowired
    public OnboardingController(OnboardingService service) {
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

    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OnboardProfile p,
                                    @RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.saveProfile(p, email));
    }

    @GetMapping
    public ResponseEntity<?> get(@RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.getProfile(email));
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody OnboardProfile p,
                                    @RequestHeader("Authorization") String token) {
        String email = extractEmail(token);
        return ResponseEntity.ok(service.updateProfile(p, email));
    }
}
