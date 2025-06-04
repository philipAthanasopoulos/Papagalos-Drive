package org.example.schoolioapi.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/cookies")
public class CookieController {

    @PostMapping
    public ResponseEntity<?> checkCookie(HttpServletRequest request) {
        Cookie sessionCookie = request.getCookies()[0];
        if (sessionCookie != null) {
            return ResponseEntity.ok().body(sessionCookie.getValue());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
