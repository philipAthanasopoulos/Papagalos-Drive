package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.NoteBlob;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteBlobRepository extends MongoRepository<NoteBlob, String> {
}
