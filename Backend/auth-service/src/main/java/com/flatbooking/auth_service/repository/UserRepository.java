package com.flatbooking.auth_service.repository;

import com.flatbooking.auth_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    // findById (email) and other methods are inherited
}
