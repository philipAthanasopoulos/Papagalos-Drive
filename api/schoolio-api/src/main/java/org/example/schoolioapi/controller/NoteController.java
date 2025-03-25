package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.Folder.FolderDTO;
import org.example.schoolioapi.DTO.Note.NoteDTODetailed;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.service.FolderService;
import org.example.schoolioapi.service.NoteService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

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
            @RequestBody Note note) {
        try {
            note.setParentFolder(folderService.getFolderById(id));
            note = noteService.save(note);
            folderService.addNoteToFolder(id, note.getId());
            return ok(FolderDTO.from(folderService.getFolderById(id)));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return status(CONFLICT).body(null);
        }
    }

    @GetMapping("notes/{id}")
    public NoteDTODetailed getNoteById(@PathVariable Long id) {
        return NoteDTODetailed.from(this.noteService.getNoteById(id).orElse(null));
    }

    @GetMapping("notes/all")
    public List<Note> getAllNotes() {
        return this.noteService.getAllNotes();
    }

    @DeleteMapping("notes/{id}")
    public void deleteNoteById(@PathVariable Long id) {
        folderService.deleteNoteFromFolderById(noteService.getNoteById(id).orElseThrow());
    }
}
