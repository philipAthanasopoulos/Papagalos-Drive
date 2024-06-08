package org.example.schoolioapi.domain;

import org.example.schoolioapi.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class SchoolioApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolioApiApplication.class, args);
	}
}
