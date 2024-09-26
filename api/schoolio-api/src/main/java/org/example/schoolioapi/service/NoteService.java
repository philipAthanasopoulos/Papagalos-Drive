package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.NoteDTO;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteBlobService noteBlobService;

    public NoteService(NoteRepository noteRepository, NoteBlobService noteBlobService) {
        this.noteRepository = noteRepository;
        this.noteBlobService = noteBlobService;
    }

    public void saveNote(Note note) throws Exception {
        if (isNoteNameInvalid(note.getName()))
            throw new Exception("Invalid note name");
        else if (fileWithNameExistsInParentFolder(note.getName(), note.getParentFolder().getName()))
            throw new Exception("File with name *"+ note.getName() +"* already exists");
        else {
            noteRepository.save(note);
        }
    }

    private boolean fileWithNameExistsInParentFolder(String fileName, String parentFolderName){
        return noteRepository.findByNameAndParentFolderName(fileName,parentFolderName);
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

    public void deleteNote(Note note) {
        noteBlobService.deleteNoteBlobById(note.getMongoId());
        noteRepository.delete(note);
    }

    public NoteDTO getNoteDTOById(Long id) {
        Note note = getNoteById(id).orElse(null);
        return NoteDTO.from(note);
    }

}
