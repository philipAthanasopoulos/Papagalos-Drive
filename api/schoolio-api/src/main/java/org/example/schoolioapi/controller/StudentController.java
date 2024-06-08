package org.example.schoolioapi.controller;

import lombok.AllArgsConstructor;
import org.example.schoolioapi.domain.Student;
import org.example.schoolioapi.service.StudentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Philip Athanasopoulos
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> fetchAllStudents(){
        return studentService.getAllStudents();
    }
}
