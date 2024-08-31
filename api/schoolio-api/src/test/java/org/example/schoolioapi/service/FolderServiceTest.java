package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.FolderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
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
    void setUp(){
        animalsFolder = folderRepository.save(new Folder("animals"));

    }

    @Test
    void getFolderById() {
        Long id = animalsFolder.getId();
        assertEquals(animalsFolder,folderService.getFolderById(id));
        assertNull(folderService.getFolderById(2L));
    }

    @Test
    void getAllFolders() {
    }

    @Test
    void getRootFolder() {
        folderRepository.save(new Folder("root"));
        Folder root = folderService.getRootFolder();
        assertEquals(root.getName(), "root");
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
    void addSubFolderToFolder() {
        folderService.addSubFolderToFolder(animalsFolder, new Folder("dogs"));

    }

    @Test
    void getFolderByName() {
        assertNotNull(folderService.getFolderByName("animals"));
    }

    @Test
    void saveFolder() {
    }

    @Test
    void getFolderDTOById() {
    }

    @Test
    void deleteNoteFromFolderById() {
    }
}