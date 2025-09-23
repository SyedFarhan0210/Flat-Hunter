package com.flatbooking.auth_service.controller;

import com.flatbooking.auth_service.dto.*;
import com.flatbooking.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService service) { this.authService = service; }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        try {
            authService.signup(req.getEmail(), req.getPassword(), req.getFirstName(), req.getLastName());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            String token = authService.login(req.getEmail(), req.getPassword());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login error");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Stateless JWT: instruct client to remove token. Optionally implement blacklist here.
        return ResponseEntity.ok("Logged out - remove token on client");
    }
}
