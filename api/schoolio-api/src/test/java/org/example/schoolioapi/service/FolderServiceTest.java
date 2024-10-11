package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.repository.FolderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class FolderServiceTest {

    @Autowired
    FolderService folderService;
    @Autowired
    FolderRepository folderRepository;
    private Folder animalsFolder;

    @BeforeEach
    void setUp() {
        animalsFolder = folderRepository.save(new Folder("animals"));
    }

    @Test
    void getFolderById() {
        Long id = animalsFolder.getId();
        assertEquals(animalsFolder, folderService.getFolderById(id));
        assertNull(folderService.getFolderById(15L));
    }


    @Test
    void addNoteToFolder() {
//        Note note = new Note();
//        folderService.addNoteToFolder(animalsFolder,note);
//        animalsFolder = folderService.getFolderById(animalsFolder.getId());
//        assertEquals(animalsFolder.getNotes().size(),1);
//        assertEquals(animalsFolder.getNotes().getFirst(),note);
    }

    @Test
    void getFolderByName() {
        assertNotNull(folderService.getFolderByName("animals"));
    }

    @Test
    void saveFolder() {
        Folder newFolder = folderService.saveFolder(new Folder("new folder"));
        assertNotNull(newFolder);
    }

    @Test
    void deleteNoteFromFolderById() {
    }

    @Test
    void testDuplicateSubFolderName() throws Exception {
        folderRepository.save(new Folder("parent"));
        Folder parent = folderRepository.getByName("parent");
        folderService.addSubFolderToFolder(parent, new Folder("child"));
        assertThrows(Exception.class, () -> folderService.addSubFolderToFolder(parent, new Folder("child")));
        assertDoesNotThrow(() -> folderService.addSubFolderToFolder(parent,new Folder("child2")));
    }
}