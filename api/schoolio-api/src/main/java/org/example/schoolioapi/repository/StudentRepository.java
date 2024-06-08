package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface StudentRepository extends MongoRepository<Student,String> {
}
