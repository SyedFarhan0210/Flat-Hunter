package com.flatapp.booking_service.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PropertyClient {
    private final RestTemplate rest = new RestTemplate();

    @Value("${property.service.base-url}")
    private String base;

    public boolean reserve(Long propertyId, String bearerToken) {
        HttpHeaders h = new HttpHeaders();
        h.set("Authorization", bearerToken);
        HttpEntity<Void> req = new HttpEntity<>(h);
        ResponseEntity<String> res = rest.exchange(
                base + "/properties/" + propertyId + "/reserve",
                HttpMethod.PUT, req, String.class);
        return res.getStatusCode().is2xxSuccessful();
    }

    public void release(Long propertyId, String bearerToken) {
        HttpHeaders h = new HttpHeaders();
        h.set("Authorization", bearerToken);
        HttpEntity<Void> req = new HttpEntity<>(h);
        rest.exchange(base + "/properties/" + propertyId + "/release",
                HttpMethod.PUT, req, String.class);
    }
}
