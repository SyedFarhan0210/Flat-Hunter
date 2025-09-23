package com.flatbooking.auth_service.service;

import com.flatbooking.auth_service.model.User;
import com.flatbooking.auth_service.repository.UserRepository;
import com.flatbooking.auth_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import com.flatbooking.auth_service.exception.UserNotFoundException;
import com.flatbooking.auth_service.exception.InvalidCredentialsException;



@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository repo,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = repo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public void signup(String email, String rawPassword, String firstName, String lastName) {
        String emailNorm = email.toLowerCase().trim();
        if (userRepository.existsById(emailNorm)) {
            throw new IllegalArgumentException("Email already in use");
        }
        String hashed = passwordEncoder.encode(rawPassword);
        User user = new User(emailNorm, hashed, firstName, lastName);
        userRepository.save(user);
    }

    public String login(String email, String password) {
        // authenticate using AuthenticationManager
         String emailNorm = email.toLowerCase().trim();

    // First check if user exists
    User user = userRepository.findById(emailNorm).orElse(null);
    if (user == null) {
        throw new UserNotFoundException("User does not exist");
    }
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email.toLowerCase().trim(), password)
            );
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        // if success, generate token
        return jwtUtil.generateToken(email.toLowerCase().trim());
    }
}
