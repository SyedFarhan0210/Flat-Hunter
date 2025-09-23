package com.flatbooking.auth_service.exception;

import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @PostConstruct
    public void init() {
        System.out.println("✅ GlobalExceptionHandler loaded successfully!");
    }

    // Handle validation errors (@Valid failures)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    // Handle user not found (email does not exist)
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(UserNotFoundException ex) {
        System.out.println("🔥 Caught UserNotFoundException: " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED) // or HttpStatus.NOT_FOUND if you prefer
                .body(Map.of("error", ex.getMessage()));
    }

    // Handle invalid credentials (wrong password)
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleInvalidCredentials(InvalidCredentialsException ex) {
        System.out.println("🔥 Caught InvalidCredentialsException: " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", ex.getMessage()));
    }

  

    // Handle all other uncaught exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {
        ex.printStackTrace(); // full stacktrace in logs
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "Internal server error",
                        "exception", ex.getClass().getSimpleName(),
                        "message", ex.getMessage() != null ? ex.getMessage() : "no message"
                ));
    }
}
