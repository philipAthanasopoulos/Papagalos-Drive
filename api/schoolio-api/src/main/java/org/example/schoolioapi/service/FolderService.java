package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.FolderDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.FolderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FolderService {

    private final FolderRepository folderRepository;
    private final NoteService noteService;

    public FolderService(FolderRepository folderRepository, NoteService noteService) {
        this.folderRepository = folderRepository;
        this.noteService = noteService;
    }

    public Folder saveFolder(Folder folder) {
        return folderRepository.save(folder);
    }

    public Folder getFolderById(Long id) {
        return folderRepository.findById(id).orElse(null);
    }

    public FolderDTO getFolderByIdAsDTO(Long id) {
        return FolderDTO.from(this.getFolderById(id));
    }

    public Folder addNoteToFolder(Folder folder, Note note) throws Exception {
        noteService.saveNote(note);
        folder.addNote(note);
        return folderRepository.save(folder);
    }

    public Folder addSubFolderToFolder(Folder folder, Folder subFolder) throws Exception {
        if (folder.containsFolderWithName(subFolder.getName()))
            throw new Exception("Folder with name *" + subFolder.getName() + "* already exists in folder *" + subFolder.getName() + "*");
        else if (isFolderNameInvalid(subFolder.getName()))
            throw new Exception("Invalid name");
        else {
            subFolder.setParent(folder);
            folder.addSubFolder(subFolder);
            folderRepository.save(subFolder);
            return folderRepository.save(folder);
        }
    }

    public Folder getFolderByName(String name) {
        return folderRepository.findFolderByName(name).orElseThrow(() ->
                new RuntimeException("Folder not found: " + name)
        );
    }

    public void deleteNoteFromFolderById(Note note) {
        Folder parent = folderRepository.findFolderByNotesContaining(note);
        parent.getNotes().remove(note);
        folderRepository.save(parent);
        noteService.deleteNote(note);
    }

    public Folder updateFields(Long id, FolderDTO updatedFolder) throws Exception {
        Folder folderToPatch = this.getFolderById(id);
        if (folderToPatch == null) return null;
        if (updatedFolder.name() != null) {
            if (folderToPatch.containsFolderWithName(updatedFolder.name()))
                throw new Exception("Folder with name *" + updatedFolder.name() + "* already exists in folder *" + updatedFolder.name() + "*");
            else if (!isFolderNameInvalid(updatedFolder.name())) {
                throw new Exception("Folder name is invalid");
            } else
                folderToPatch.setName(updatedFolder.name());
        }
        return this.saveFolder(folderToPatch);
    }

    private boolean isFolderNameInvalid(String name) {
        return name.isBlank() || name.isEmpty() || name.strip().equals("undefined");
    }
}
