package com.flatapp.property_service.service;

import com.flatapp.property_service.model.Property;
import com.flatapp.property_service.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository repo;

    public Property addProperty(Property property, String email) {
        property.setOwnerEmail(email);
        if (property.getCurrentOccupancy() == null) {
            property.setCurrentOccupancy(0);
        }
        return repo.save(property);
    }

    public List<Property> getAll() {
        return repo.findAll();
    }

    public List<Property> getByCity(String city) {
        return repo.findByCityIgnoreCase(city);
    }

    public List<Property> getByAddress(String address) {
        return repo.findByAddressContainingIgnoreCase(address);
    }

    public List<Property> getByOwner(String email) {
        return repo.findByOwnerEmail(email);
    }

    public Property updateProperty(Long id, Property newData, String email) {
    Property old = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Property not found"));

    if (!old.getOwnerEmail().equals(email)) {
        throw new RuntimeException("Unauthorized update attempt");
    }

    // Only update fields that were actually provided
    if (newData.getTitle() != null) old.setTitle(newData.getTitle());
    if (newData.getDescription() != null) old.setDescription(newData.getDescription());
    if (newData.getAddress() != null) old.setAddress(newData.getAddress());
    if (newData.getCity() != null) old.setCity(newData.getCity());
    if (newData.getRent() != null) old.setRent(newData.getRent());
    if (newData.getPropertyType() != null) old.setPropertyType(newData.getPropertyType());
    if (newData.getFurnished() != null) old.setFurnished(newData.getFurnished());
    if (newData.getAvailableFrom() != null) old.setAvailableFrom(newData.getAvailableFrom());
    if (newData.getContactNumber() != null) old.setContactNumber(newData.getContactNumber());
    if (newData.getMaxOccupancy() != null) old.setMaxOccupancy(newData.getMaxOccupancy());
    if (newData.getCurrentOccupancy() != null) old.setCurrentOccupancy(newData.getCurrentOccupancy());

    return repo.save(old);
}

    public void deleteProperty(Long id, String email) {
        Property property = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        if (!property.getOwnerEmail().equals(email)) {
            throw new RuntimeException("Unauthorized delete attempt");
        }
        repo.delete(property);
    }

    @Transactional
public boolean reserveSlot(Long propertyId) {
    Property p = repo.findByIdForUpdate(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
    if (p.getCurrentOccupancy() == null) p.setCurrentOccupancy(0);
    if (p.getMaxOccupancy() == null) p.setMaxOccupancy(0);

    if (p.getCurrentOccupancy() >= p.getMaxOccupancy()) {
        return false;
    }
    p.setCurrentOccupancy(p.getCurrentOccupancy() + 1);
    repo.save(p);
    return true;
}

@Transactional
public void releaseSlot(Long propertyId) {
    Property p = repo.findByIdForUpdate(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
    if (p.getCurrentOccupancy() == null) p.setCurrentOccupancy(0);
    if (p.getCurrentOccupancy() > 0) {
        p.setCurrentOccupancy(p.getCurrentOccupancy() - 1);
        repo.save(p);
    }
}




}
