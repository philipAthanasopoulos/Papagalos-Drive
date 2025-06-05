package org.example.schoolioapi.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.schoolioapi.DTO.User.UserDTO;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private UserService userService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public LoginController(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(
            @RequestBody User userToCkeck,
            HttpServletRequest request
    ) {
        User user = userService.findByEmail(userToCkeck.getEmail()).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (!bCryptPasswordEncoder.matches(userToCkeck.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        HttpSession session = request.getSession();
        session.setAttribute("user", user);

        return ResponseEntity.ok(UserDTO.from(user));
    }


    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
            System.out.println("Removed Session");
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
