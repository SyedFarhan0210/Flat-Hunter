package com.flatbooking.auth_service.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password; // hashed

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    public User() {}

    public User(String email, String password, String firstName, String lastName) {
        this.email = email.toLowerCase().trim();
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // getters & setters
    // ... generate or use Lombok @Data if you prefer
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email.toLowerCase().trim(); }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public Instant getCreatedAt() { return createdAt; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
