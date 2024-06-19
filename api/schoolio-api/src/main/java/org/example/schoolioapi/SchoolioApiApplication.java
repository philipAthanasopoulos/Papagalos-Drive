package org.example.schoolioapi;

import org.example.schoolioapi.domain.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {MongoAutoConfiguration.class})
public class SchoolioApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(SchoolioApiApplication.class, args);
	}
}
