package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    Folder findByName(String name);

    Optional<Folder> findFolderByName(String name);

    Folder findFolderByNotesContaining(Note note);

    boolean findByParentNameAndName(String parentName, String subFolderName);

}
