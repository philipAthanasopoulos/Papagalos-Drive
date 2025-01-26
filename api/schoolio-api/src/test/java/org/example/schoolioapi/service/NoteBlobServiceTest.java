package org.example.schoolioapi.service;

import org.bson.types.Binary;
import org.example.schoolioapi.domain.NoteBlob;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
class NoteBlobServiceTest {

    @Autowired
    NoteBlobService noteBlobService;
    NoteBlob noteBlob;

    @BeforeEach
    void setUp() {
        byte[] array = {0x12};
        Binary binary = new Binary(array);
        noteBlob = new NoteBlob(binary);
    }

    @Test
    void saveNoteBlob() {
        noteBlob = noteBlobService.saveNoteBlob(noteBlob);
        assertNotNull(noteBlob.getId());
        assertEquals(noteBlob.getData(), new Binary(new byte[]{0x12}));
    }

    @Test
    void getNoteBlobById() {

    }

    @Test
    void deleteNoteBlobById() {

    }
}