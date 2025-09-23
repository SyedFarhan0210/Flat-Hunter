package com.flatbooking.auth_service.service;

import com.flatbooking.auth_service.model.User;
import com.flatbooking.auth_service.repository.UserRepository;
import com.flatbooking.auth_service.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository repo) { this.userRepository = repo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String email = username.toLowerCase();
        User user = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return new UserPrincipal(user);
    }
}
