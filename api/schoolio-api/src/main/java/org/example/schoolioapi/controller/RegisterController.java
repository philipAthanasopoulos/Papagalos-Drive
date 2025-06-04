package org.example.schoolioapi.controller;

import jakarta.validation.Valid;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
@CrossOrigin
public class RegisterController {
    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        } else {
            userService.save(user);
            return ResponseEntity.ok().body("User registered successfully");
        }
    }
}