package org.example.schoolioapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Philip Athanasopoulos
 */
@RestController
@RequestMapping("/")
public class HomepageController {

    @GetMapping
    public String welocmePage(){
        return "Hello";
    }
}
