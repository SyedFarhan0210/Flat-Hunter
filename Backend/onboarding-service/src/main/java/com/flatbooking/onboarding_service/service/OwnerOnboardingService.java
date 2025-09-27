package com.flatbooking.onboarding_service.service;

import com.flatbooking.onboarding_service.entity.OwnerProfile;
import com.flatbooking.onboarding_service.repository.OwnerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class OwnerOnboardingService {

    private final OwnerProfileRepository ownerRepo;

    @Autowired
    public OwnerOnboardingService(OwnerProfileRepository ownerRepo) {
        this.ownerRepo = ownerRepo;
    }

    public OwnerProfile createProfile(String email, OwnerProfile incoming) {
        if (ownerRepo.existsByUserEmail(email)) {
            throw new IllegalStateException("Owner profile already exists");
        }
        incoming.setUserEmail(email);
        incoming.setCreatedAt(Instant.now());
        incoming.setUpdatedAt(Instant.now());
        return ownerRepo.save(incoming);
    }

    public OwnerProfile getProfile(String email) {
        return ownerRepo.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Owner profile not found"));
    }

    public OwnerProfile updateProfile(String email, OwnerProfile incoming) {
        Optional<OwnerProfile> opt = ownerRepo.findByUserEmail(email);
        if (opt.isEmpty()) {
            throw new IllegalArgumentException("Owner profile not found");
        }
        OwnerProfile existing = opt.get();

        if (incoming.getPhoneNumber() != null) existing.setPhoneNumber(incoming.getPhoneNumber());

        existing.setUpdatedAt(Instant.now());
        return ownerRepo.save(existing);
    }
}
