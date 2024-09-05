package org.example.schoolioapi.controller;

import org.bson.types.Binary;
import org.example.schoolioapi.DTO.NoteDTO;
import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.domain.NoteBlob;
import org.example.schoolioapi.service.FolderService;
import org.example.schoolioapi.service.NoteBlobService;
import org.example.schoolioapi.service.NoteService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin()
public class NoteController {
    private final NoteService noteService;
    private final FolderService folderService;
    private final NoteBlobService noteBlobService;

    public NoteController(NoteService noteService, FolderService folderService, NoteBlobService mongoRepository) {
        this.noteService = noteService;
        this.folderService = folderService;
        this.noteBlobService = mongoRepository;
    }

    @PostMapping("/folder/{id}/addNote")
    @CacheEvict(value = "folderDTO", key = "#id")
    public void uploadNote(@PathVariable Long id, @RequestParam("title") String title, @RequestParam("file") MultipartFile file) throws IOException {
        Folder folder = folderService.getFolderById(id);
        NoteBlob blob = noteBlobService.saveNoteBlob(new NoteBlob(new Binary(file.getBytes())));
        Note note = noteService.saveNote(new Note(
                title,
                FileType.valueOf(getFileExtension(file)),
                blob.getId(),
                folder)
        );
        folderService.addNoteToFolder(folder, note);
    }

    private String getFileExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        return name.substring(name.lastIndexOf(".") + 1).toUpperCase();
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
