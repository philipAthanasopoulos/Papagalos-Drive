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

    public Note saveNote(Note note) {
        return noteRepository.save(note);
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

    public NoteDTO getNoteDTOById(Long id){
        Note note = getNoteById(id).orElse(null);

        return NoteDTO.builder()
                .id(note.getId())
                .name(note.getName())
                .type(note.getType())
                .mongoId(note.getMongoId())
                .uploadDate(note.getUploadDate())
                .path(note.getParentFolder().getPath() + "/" + note.getName())
                .build();
    }
}
