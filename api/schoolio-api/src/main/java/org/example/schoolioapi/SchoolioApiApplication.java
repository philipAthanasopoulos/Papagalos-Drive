package org.example.schoolioapi;

import org.example.schoolioapi.domain.Address;
import org.example.schoolioapi.domain.Gender;
import org.example.schoolioapi.domain.Student;
import org.example.schoolioapi.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication()
public class SchoolioApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(SchoolioApiApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(StudentRepository repository){
		return args -> {
			Student student  = new Student(
					"John",
					"Doe",
					"johnDoe@gmail.com",
					Gender.MALE,
					new Address(
							"a","b","c"
					),
					List.of("Chemistry"),
					BigDecimal.ONE,
					LocalDateTime.now()
			);

			repository.insert(student);
		};
	}
}
