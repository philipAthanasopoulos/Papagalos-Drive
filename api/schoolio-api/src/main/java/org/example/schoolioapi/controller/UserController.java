package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.UserDTO;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserDTO> getUsers() {
        return userService.getUsersDTO();
    }

    @PostMapping("/users")
    public void createUser(@RequestBody User user) {
        userService.save(user);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        User newUser = userService.save(user);
        if (newUser != null) return ResponseEntity.ok(UserDTO.from(newUser));
        else return ResponseEntity.badRequest().body("Email is already registered");
    }

    @GetMapping("/register")
    public String register() {
        return "Hello";
    }
}
