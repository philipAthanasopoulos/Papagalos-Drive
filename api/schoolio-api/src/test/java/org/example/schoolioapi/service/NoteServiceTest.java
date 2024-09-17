package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.NoteRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
@ActiveProfiles("test")
class NoteServiceTest {

    @Autowired
    private NoteService noteService;
    @Autowired
    private NoteRepository noteRepository;
    private Note animalsNote;

    @Test
    void saveNote() throws Exception {
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