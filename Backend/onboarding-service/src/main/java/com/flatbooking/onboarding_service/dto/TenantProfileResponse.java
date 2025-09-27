package com.flatbooking.onboarding_service.dto;
import java.util.List;

public class TenantProfileResponse {
    public Long id;
    public String userEmail;
    public String phoneNumber;
    public String gender;
    public Integer age;
    public String occupation;
    public List<String> preferredLocations;
    public String foodPreference;
    public String createdAt;
    public String updatedAt;
}