package com.flatbooking.onboarding_service.service;

import com.flatbooking.onboarding_service.entity.TenantProfile;
import com.flatbooking.onboarding_service.repository.TenantProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class OnboardingService {

    private final TenantProfileRepository tenantRepo;

    @Autowired
    public OnboardingService(TenantProfileRepository tenantRepo) {
        this.tenantRepo = tenantRepo;
    }

    public TenantProfile createProfile(String email, TenantProfile incoming) {
        if (tenantRepo.existsByUserEmail(email)) {
            throw new IllegalStateException("Profile already exists");
        }
        TenantProfile profile = incoming;
        profile.setUserEmail(email);
        profile.setCreatedAt(Instant.now());
        profile.setUpdatedAt(Instant.now());
        return tenantRepo.save(profile);
    }

    public TenantProfile getProfile(String email) {
        return tenantRepo.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    }

    public TenantProfile updateProfile(String email, TenantProfile incoming) {
        Optional<TenantProfile> opt = tenantRepo.findByUserEmail(email);
        if (opt.isEmpty()) {
            throw new IllegalArgumentException("Profile not found");
        }
        TenantProfile existing = opt.get();

        if (incoming.getPhoneNumber() != null) existing.setPhoneNumber(incoming.getPhoneNumber());
        if (incoming.getGender() != null) existing.setGender(incoming.getGender());
        if (incoming.getAge() != null) existing.setAge(incoming.getAge());
        if (incoming.getOccupation() != null) existing.setOccupation(incoming.getOccupation());
        if (incoming.getPreferredLocations() != null) existing.setPreferredLocations(incoming.getPreferredLocations());
        if (incoming.getFoodPreference() != null) existing.setFoodPreference(incoming.getFoodPreference());

        existing.setUpdatedAt(Instant.now());
        return tenantRepo.save(existing);
    }
}
