package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final NoteService noteService;

    public FolderService(FolderRepository folderRepository, NoteService noteService) {
        this.folderRepository = folderRepository;
        this.noteService = noteService;
    }

    public Optional<Folder> getFolderById(Long id) {
        return folderRepository.findById(id);
    }

    public List<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    public Folder getRootFolder() {
        return folderRepository.findByName("root");
    }

    public void addNoteToFolder(Folder folder, Note note) {
        folder.addNote(note);
        noteService.saveNote(note);
        folderRepository.save(folder);
    }

    public void addSubFolderToFolder(Folder folder, Folder subFolder) {
        folder.addSubFolder(subFolder);
        folderRepository.save(subFolder);
        folderRepository.save(folder);
    }

    public Folder getFolderByName(String name) {
        return folderRepository.findFolderByName(name).orElse(
                saveFolder(new Folder(name))
        );
    }

    public Folder saveFolder(Folder folder) {
        return folderRepository.save(folder);
    }
}
