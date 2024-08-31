package org.example.schoolioapi.repository;

import org.example.schoolioapi.domain.Folder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class FolderRepositoryTest {

    @Autowired
    private FolderRepository folderRepository;

    @BeforeEach
    void setUp() {
        folderRepository.save(new Folder("animals"));
    }

    @Test
    void findByName() {
        assertNotNull(folderRepository.findByName("animals"));
        assertNull(folderRepository.findByName("aliens"));
    }

    @Test
    void findFolderByName() {
    }

    @Test
    void findFolderByNotesContaining() {
    }
}