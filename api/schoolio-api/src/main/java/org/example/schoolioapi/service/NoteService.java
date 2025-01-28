package org.example.schoolioapi.service;

import org.bson.types.Binary;
import org.example.schoolioapi.DTO.NoteDTO;
import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.domain.NoteBlob;
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
    private final NoteBlobService noteBlobService;

    public NoteService(NoteRepository noteRepository, NoteBlobService noteBlobService) {
        this.noteRepository = noteRepository;
        this.noteBlobService = noteBlobService;
    }

    public Note saveNote(String title, MultipartFile file) throws Exception {
        NoteBlob blob = noteBlobService.saveNoteBlob(file);
        Note note = Note.builder()
                .name(title)
                .type(FileType.valueOf(getFileExtension(file)))
                .mongoId(blob.getId())
                .build();
        return saveNote(note);
    }

    public Note saveNote(Note note) throws Exception {
        return noteRepository.save(note);
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

    public void deleteNote(Note note) {
        noteBlobService.deleteNoteBlobById(note.getMongoId());
        noteRepository.delete(note);
    }

    public NoteDTO getNoteDTOById(Long id) {
        Note note = getNoteById(id).orElse(null);
        return NoteDTO.from(note);
    }

    private String getFileExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        return name.substring(name.lastIndexOf(".") + 1).toUpperCase();
    }

}
