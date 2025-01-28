package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.FolderDTO;
import org.example.schoolioapi.DTO.NoteDTO;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.service.FolderService;
import org.example.schoolioapi.service.NoteService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class NoteController {
    private final NoteService noteService;
    private final FolderService folderService;

    public NoteController(NoteService noteService, FolderService folderService) {
        this.noteService = noteService;
        this.folderService = folderService;
    }

    @PostMapping("/folder/{id}/notes")
    @CacheEvict(value = "folderDTO", key = "#id")
    public ResponseEntity<FolderDTO> uploadNote(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            Note note = noteService.saveNote(title, file);
            folderService.addNoteToFolder(id, note.getId());
            return ResponseEntity.ok(FolderDTO.from(folderService.getFolderById(id)));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/note/{id}")
    public NoteDTO getNoteById(@PathVariable Long id) {
        return this.noteService.getNoteDTOById(id);
    }

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return this.noteService.getAllNotes();
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNoteById(@PathVariable Long id) {
        folderService.deleteNoteFromFolderById(noteService.getNoteById(id).orElseThrow());
    }
}
