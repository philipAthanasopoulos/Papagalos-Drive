package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.NoteBlob;
import org.example.schoolioapi.repository.NoteBlobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class NoteBlobServiceTest {

    @Autowired
    private NoteBlobService noteBlobService;
    @Autowired
    private NoteBlobRepository noteBlobRepository;


    @Test
    void saveNoteBlob() {
    }

    @Test
    void getNoteBlobById() {
    }

    @Test
    void deleteNoteBlobById() {
    }
}