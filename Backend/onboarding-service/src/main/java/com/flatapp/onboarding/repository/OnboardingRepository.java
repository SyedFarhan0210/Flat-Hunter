package com.flatapp.onboarding.repository;

import com.flatapp.onboarding.model.OnboardProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OnboardingRepository extends JpaRepository<OnboardProfile, Long> {
    Optional<OnboardProfile> findByUserEmail(String email);
}
