package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
