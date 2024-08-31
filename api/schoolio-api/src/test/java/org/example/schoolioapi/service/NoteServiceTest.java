package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NoteServiceTest {

    @Autowired
    private NoteService noteService;

    @Test
    void saveNote() {
//        noteService.saveNote(new Note("cool note"));
    }

    @Test
    void getNoteById() {
    }

    @Test
    void getAllNotes() {
    }

    @Test
    void deleteNote() {
    }
}