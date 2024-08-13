package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    Folder findByName(String name);
    Optional<Folder> findFolderByName(String name);
    Folder findFolderByNotesContaining(Note note);
}
