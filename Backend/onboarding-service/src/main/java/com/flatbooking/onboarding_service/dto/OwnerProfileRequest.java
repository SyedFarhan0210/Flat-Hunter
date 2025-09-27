package com.flatbooking.onboarding_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OwnerProfileRequest {
    @NotBlank(message = "phoneNumber is required")
    @Size(max = 30)
    public String phoneNumber;
}
