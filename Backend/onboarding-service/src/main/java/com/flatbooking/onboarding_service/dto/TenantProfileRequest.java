package com.flatbooking.onboarding_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public class TenantProfileRequest {
    @NotBlank(message = "phoneNumber is required")
    @Size(max = 30)
    public String phoneNumber;

    public String gender;
    public Integer age;
    public String occupation;
    public List<String> preferredLocations;
    public String foodPreference;

    // getters/setters if needed
}
