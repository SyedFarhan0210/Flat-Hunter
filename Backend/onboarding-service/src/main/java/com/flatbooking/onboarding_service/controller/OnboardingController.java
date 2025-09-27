package com.flatbooking.onboarding_service.controller;

import com.flatbooking.onboarding_service.dto.TenantProfileRequest;
import com.flatbooking.onboarding_service.dto.TenantProfileResponse;
import com.flatbooking.onboarding_service.entity.TenantProfile;
import com.flatbooking.onboarding_service.service.OnboardingService;
import com.flatbooking.onboarding_service.dto.OwnerProfileRequest;
import com.flatbooking.onboarding_service.entity.OwnerProfile;
import com.flatbooking.onboarding_service.service.OwnerOnboardingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/onboarding")
public class OnboardingController {

    @Autowired
    private OnboardingService onboardingService;

    @Autowired
    private OwnerOnboardingService ownerService;

    // Create (first time only)
    @PostMapping("/tenant")
    public ResponseEntity<?> createTenant(@Valid @RequestBody TenantProfileRequest req, Authentication authentication) {
        String email = authentication.getName();
        TenantProfile incoming = toEntity(req);
        try {
            TenantProfile saved = onboardingService.createProfile(email, incoming);
            return ResponseEntity.ok(toResponse(saved));
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    // Get profile
    @GetMapping("/tenant")
    public ResponseEntity<?> getTenant(Authentication authentication) {
        String email = authentication.getName();
        try {
            TenantProfile p = onboardingService.getProfile(email);
            return ResponseEntity.ok(toResponse(p));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    // Update profile
    @PutMapping("/tenant")
    public ResponseEntity<?> updateTenant(@RequestBody TenantProfileRequest req, Authentication authentication) {
        String email = authentication.getName();
        try {
            TenantProfile incoming = toEntity(req);
            TenantProfile updated = onboardingService.updateProfile(email, incoming);
            return ResponseEntity.ok(toResponse(updated));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    // helpers to map
    private TenantProfile toEntity(TenantProfileRequest req) {
    TenantProfile t = new TenantProfile();
    t.setPhoneNumber(req.phoneNumber);
    t.setGender(req.gender);
    t.setAge(req.age);
    t.setOccupation(req.occupation);
    t.setPreferredLocations(req.preferredLocations);   // ✅ List<String>
    t.setFoodPreference(req.foodPreference);
    t.setUpdatedAt(Instant.now());
    return t;
}

private TenantProfileResponse toResponse(TenantProfile p) {
    TenantProfileResponse r = new TenantProfileResponse();
    r.id = p.getId();
    r.userEmail = p.getUserEmail();
    r.phoneNumber = p.getPhoneNumber();
    r.gender = p.getGender();
    r.age = p.getAge();
    r.occupation = p.getOccupation();
    r.preferredLocations = p.getPreferredLocations();   // ✅ List<String>
    r.foodPreference = p.getFoodPreference();
    r.createdAt = p.getCreatedAt().toString();
    r.updatedAt = p.getUpdatedAt().toString();
    return r;
}



    @PostMapping("/owner")
    public ResponseEntity<?> createOwner(@Valid @RequestBody OwnerProfileRequest req, Authentication auth) {
        String email = auth.getName();
        try {
            OwnerProfile profile = new OwnerProfile();
            profile.setPhoneNumber(req.phoneNumber);
            OwnerProfile saved = ownerService.createProfile(email, profile);
            return ResponseEntity.ok(saved);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/owner")
    public ResponseEntity<?> getOwner(Authentication auth) {
        String email = auth.getName();
        try {
            OwnerProfile profile = ownerService.getProfile(email);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    @PutMapping("/owner")
    public ResponseEntity<?> updateOwner(@RequestBody OwnerProfileRequest req, Authentication auth) {
        String email = auth.getName();
        try {
            OwnerProfile incoming = new OwnerProfile();
            incoming.setPhoneNumber(req.phoneNumber);
            incoming.setUpdatedAt(Instant.now());
            OwnerProfile updated = ownerService.updateProfile(email, incoming);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }



}
