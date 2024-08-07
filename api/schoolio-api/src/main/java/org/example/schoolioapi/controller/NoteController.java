package org.example.schoolioapi.controller;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.service.FolderService;
import org.example.schoolioapi.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class NoteController {
    private final NoteService noteService;
    private final FolderService folderService;

    @Autowired
    public NoteController(NoteService noteService, FolderService folderService) {
        this.noteService = noteService;
        this.folderService = folderService;
    }

    @PostMapping("/notes/add")
    public void uploadNote(@RequestParam("title") String title,
                           @RequestParam("image") MultipartFile content,
                           @RequestParam("targetFolder") String targetFolder,
                           Model model) throws IOException {
        Note note = new Note();
        note.setFileName(title);
        note.setFile(Base64.getEncoder().encodeToString(content.getBytes()));
        this.noteService.saveNote(note);

        Folder folder = folderService.getFolderByName(targetFolder);
        folder.addNote(note);
        this.folderService.saveFolder(folder);

    }

    @GetMapping("/notes/{id}")
    public Note getNoteById(@PathVariable String id) {
        return this.noteService.getNoteById(id).orElse(null);
    }

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return this.noteService.getAllNotes();
    }
}
