package org.example.schoolioapi.service;

import lombok.AllArgsConstructor;
import org.example.schoolioapi.domain.Student;
import org.example.schoolioapi.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Philip Athanasopoulos
 */
@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        System.out.println("Found " + students.size() + "students");
        return students;
    }
}
