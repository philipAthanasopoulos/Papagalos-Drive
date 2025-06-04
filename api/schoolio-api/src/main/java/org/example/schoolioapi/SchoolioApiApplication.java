package org.example.schoolioapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@SpringBootApplication
@EnableCaching
@EnableScheduling
@Transactional
public class SchoolioApiApplication {

    @Autowired
    private Environment environment;
    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    public void setEnvironment(Environment environment) {
        System.out.println("Active Profiles: " + Arrays.toString(environment.getActiveProfiles()));
        System.out.println("Property 'spring.datasource.url': " + environment.getProperty("spring.datasource.url"));
    }

    public static void main(String[] args) {
        SpringApplication.run(SchoolioApiApplication.class, args);
    }


}