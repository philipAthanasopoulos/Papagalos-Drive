package org.example.schoolioapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
@EnableCaching
@EnableScheduling
@Transactional
public class SchoolioApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchoolioApiApplication.class, args);
    }

}