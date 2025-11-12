package com.flatapp.property_service.repository;

import com.flatapp.property_service.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.persistence.LockModeType;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByCityIgnoreCase(String city);
    List<Property> findByAddressContainingIgnoreCase(String address);
    List<Property> findByOwnerEmail(String ownerEmail);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Property p WHERE p.id = :id")
    Optional<Property> findByIdForUpdate(@Param("id") Long id);
}
