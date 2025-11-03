package com.flatapp.onboarding.service;

import com.flatapp.onboarding.model.OnboardProfile;
import com.flatapp.onboarding.repository.OnboardingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OnboardingService {

    private final OnboardingRepository repo;

    // ✅ Explicit constructor for dependency injection
    @Autowired
    public OnboardingService(OnboardingRepository repo) {
        this.repo = repo;
    }

    public OnboardProfile saveProfile(OnboardProfile p, String email) {
    return repo.findByUserEmail(email)
            .orElseGet(() -> {
                p.setUserEmail(email);
                return repo.save(p);
            });
}

    public OnboardProfile getProfile(String email) {
        return repo.findByUserEmail(email)
                   .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public OnboardProfile updateProfile(OnboardProfile np, String email) {
        OnboardProfile op = getProfile(email);
        op.setPhone(np.getPhone());
        op.setGender(np.getGender());
        op.setProfession(np.getProfession());
        op.setCity(np.getCity());
        op.setBudgetRange(np.getBudgetRange());
        op.setPreferredLocation(np.getPreferredLocation());
        op.setLifestyle(np.getLifestyle());
        op.setBio(np.getBio());
        return repo.save(op);
    }
}
