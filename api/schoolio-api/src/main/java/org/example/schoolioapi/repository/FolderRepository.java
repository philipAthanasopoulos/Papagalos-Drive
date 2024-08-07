package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Folder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FolderRepository extends MongoRepository<Folder, String> {
    Folder findByName(String metafrastes);

}
