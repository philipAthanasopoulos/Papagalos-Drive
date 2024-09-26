package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

    boolean findByNameAndParentFolderName(String noteName, String parentFolderName);
}
