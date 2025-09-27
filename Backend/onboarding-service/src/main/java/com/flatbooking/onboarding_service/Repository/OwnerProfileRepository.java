package com.flatbooking.onboarding_service.repository;

import com.flatbooking.onboarding_service.entity.OwnerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerProfileRepository extends JpaRepository<OwnerProfile, Long> {
    Optional<OwnerProfile> findByUserEmail(String userEmail);
    boolean existsByUserEmail(String userEmail);
}
