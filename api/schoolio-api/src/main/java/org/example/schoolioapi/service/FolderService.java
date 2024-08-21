package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.FolderDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.FolderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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

        saveFolder(subFolder);

        if (!folder.getSubFolders().contains(subFolder)) {
            folder.addSubFolder(subFolder);
            saveFolder(folder);
        } else
            System.out.println("sub folder " + subFolder.getName().toUpperCase() + " already exists in " + folder.getName().toUpperCase());
    }


    public Folder getFolderByName(String name) {
        return folderRepository.findFolderByName(name).orElseThrow(() ->
                new RuntimeException("Folder not found: " + name)
        );
    }


    public Folder saveFolder(Folder folder) {
        return folderRepository.save(folder);
    }

    public FolderDTO getFolderDTOById(Long id) {
        return convertToDTO(this.getFolderById(id).orElseThrow());
    }

    //TODO
    //Check if the stream method is optimal
    //Maybe a select query should be used instead
    private FolderDTO convertToDTO(Folder folder) {
        return FolderDTO.builder()
                .Id(folder.getId())
                .name(folder.getName())
                .subFolderIds(folder.getSubFolders().stream().map(Folder::getId).toList())
                .subFolderNames(folder.getSubFolders().stream().map(Folder::getName).toList())
                .noteBlobIds(folder.getNotes().stream().map(Note::getMongoId).toList())
                .noteNames(folder.getNotes().stream().map(Note::getName).toList())
                .build();
    }

    public void deleteNoteFromFolderById(Note note) {
        Folder parent = folderRepository.findFolderByNotesContaining(note);
        parent.getNotes().remove(note);
        folderRepository.save(parent);
        noteService.deleteNote(note);
    }
}
