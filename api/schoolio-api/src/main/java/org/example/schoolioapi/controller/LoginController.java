//package org.example.schoolioapi.controller;
//
//import org.example.schoolioapi.domain.User;
//import org.example.schoolioapi.service.UserService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//public class LoginController {
//
//    private UserService userService;
//
//    public LoginController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/login")
//    public ResponseEntity<User> loginUser(@RequestParam String email, @RequestParam String password) {
//        User user = userService.validateUser(email, password);
//        if (user != null) return ResponseEntity.ok(user);
//        else return ResponseEntity.status(401).build();
//    }
//}
