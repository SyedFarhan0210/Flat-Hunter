package com.flatbooking.onboarding_service.repository;

import com.flatbooking.onboarding_service.entity.TenantProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TenantProfileRepository extends JpaRepository<TenantProfile, Long> {
    Optional<TenantProfile> findByUserEmail(String userEmail);
    boolean existsByUserEmail(String userEmail);
}
