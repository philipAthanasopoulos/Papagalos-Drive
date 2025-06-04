package org.example.schoolioapi.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.schoolioapi.DTO.User.UserDTO;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    public UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody LoginBody userToCkeck,
        HttpServletRequest request) {
        System.out.println("Got request" + userToCkeck.email);
        User user = userService.findByEmail(userToCkeck.email).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (!user.getPassword().equals(userToCkeck.password)) {
            return ResponseEntity.badRequest().build();
        }

        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        return ResponseEntity.ok(UserDTO.from(user));
    }

    public static class LoginBody {
        public String email;
        public String password;
        public LoginBody(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public static LoginBody from(User user) {
            return new LoginBody(user.getEmail(), user.getPassword());
        }
    }
}
