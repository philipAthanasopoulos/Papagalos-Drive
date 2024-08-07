package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository extends MongoRepository<Note, String> {
}
