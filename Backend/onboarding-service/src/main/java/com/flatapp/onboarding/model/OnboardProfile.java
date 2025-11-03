package com.flatapp.onboarding.model;

import jakarta.persistence.*;

@Entity
public class OnboardProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String userEmail;

   
    private String phone;
    private String gender;
    private String profession;
    private String city;
    private String budgetRange;
    private String preferredLocation;
    private String lifestyle;
    private String bio;

    // ---- Getters ----
    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getPhone() {
        return phone;
    }

    public String getGender() {
        return gender;
    }

    public String getProfession() {
        return profession;
    }

    public String getCity() {
        return city;
    }

    public String getBudgetRange() {
        return budgetRange;
    }

    public String getPreferredLocation() {
        return preferredLocation;
    }

    public String getLifestyle() {
        return lifestyle;
    }

    public String getBio() {
        return bio;
    }

    // ---- Setters ----
    public void setId(Long id) {
        this.id = id;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setBudgetRange(String budgetRange) {
        this.budgetRange = budgetRange;
    }

    public void setPreferredLocation(String preferredLocation) {
        this.preferredLocation = preferredLocation;
    }

    public void setLifestyle(String lifestyle) {
        this.lifestyle = lifestyle;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
