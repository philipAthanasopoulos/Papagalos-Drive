package org.example.schoolioapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Philip Athanasopoulos
 */
@Controller
@CrossOrigin(origins = "*")

public class HomepageController {

    @RequestMapping("/hello")
    public String welcomePage() {
        return "hello";
    }
}
