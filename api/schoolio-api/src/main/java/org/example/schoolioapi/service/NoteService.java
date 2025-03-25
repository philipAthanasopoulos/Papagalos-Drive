package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.Note.NoteDTO;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    private boolean fileWithNameExistsInParentFolder(String fileName, String parentFolderName) {
        return noteRepository.existsByNameAndParentFolderName(fileName, parentFolderName);
    }

    private boolean isNoteNameInvalid(String name) {
        return name == null || name.isBlank() || name.isEmpty() || name.strip().equals("undefined");
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public void delete(Note note) {
        noteRepository.delete(note);
    }

    public Note save(Note note) {
        return noteRepository.save(note);
    }
}
