package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.Folder.FolderDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.repository.FolderRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FolderService {

    private final FolderRepository folderRepository;
    private final NoteService noteService;

    public FolderService(FolderRepository folderRepository, NoteService noteService) {
        this.folderRepository = folderRepository;
        this.noteService = noteService;
    }

    public Long create(FolderDTO folderDTO) {
        final Folder folder = new Folder();
        mapToEntity(folderDTO, folder);
        return folderRepository.save(folder).getId();
    }

    private void mapToEntity(final FolderDTO folderDTO, final Folder folder) {
        folder.setName(folderDTO.name());
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

    public void addNoteToFolder(Long folderId, Long noteId) {
        Folder folder = getFolderById(folderId);
        Note note = noteService.getNoteById(noteId).orElse(null);
        folder.addNote(note);
        folderRepository.save(folder);
    }

    public Folder addSubFolderToFolder(Folder folder, Folder subFolder) throws Exception {
        if (folderContainsSubFolderWithName(folder.getName(), subFolder.getName()))
            throw new Exception("Folder with name *" + subFolder.getName() + "* already exists in folder *" + folder.getName() + "*");
        else if (isFolderNameInvalid(subFolder.getName()))
            throw new Exception("Invalid name");
        else {
            subFolder.setParent(folder);
            folder.addSubFolder(subFolder);
            folderRepository.save(subFolder);
            return folderRepository.save(folder);
        }
    }

    public void addSubFolderToFolder(Long parentFolderId, Long subFolderId) throws Exception {
        Folder parentFolder = folderRepository.findById(parentFolderId).orElseThrow();
        Folder subFolder = folderRepository.findById(subFolderId).orElseThrow();
        parentFolder.addSubFolder(subFolder);
        saveFolder(subFolder);
        saveFolder(parentFolder);
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
        noteService.delete(note);
    }

    public Folder updateFields(Long id, FolderDTO updatedFolder) throws Exception {
        Folder folderToPatch = this.getFolderById(id);
        if (folderToPatch == null) return null;
        if (updatedFolder.name() != null) {
            if (folderContainsSubFolderWithName(folderToPatch.getName(), updatedFolder.name()))
                throw new Exception("Folder with name *" + updatedFolder.name() + "* already exists in folder *" + folderToPatch.getName() + "*");
            else if (isFolderNameInvalid(updatedFolder.name())) {
                throw new Exception("Folder name is invalid");
            } else
                folderToPatch.setName(updatedFolder.name());
        }
        return this.saveFolder(folderToPatch);
    }

    private boolean folderContainsSubFolderWithName(String parentName, String subFolderName) {
        return folderRepository.findByParentNameAndName(parentName, subFolderName) != null;
    }

    private boolean isFolderNameInvalid(String name) {
        return name.isBlank() || name.isEmpty() || name.strip().equals("undefined");
    }

    public List<FolderDTO> getFolderSubfolders(Long id) {
        Folder folder = getFolderById(id);
        return folder.getSubFolders().stream().map(FolderDTO::from).toList();
    }

    public void addSubFolder(Long id, FolderDTO subfolderDTO) throws Exception {
        Folder parentFolder = getFolderById(id);
        if (parentFolder == null) {
            throw new Exception("Parent folder not found");
        }

        Folder subfolder = new Folder();
        mapToEntity(subfolderDTO, subfolder);
        subfolder = saveFolder(subfolder);

        addSubFolderToFolder(parentFolder.getId(), subfolder.getId());
    }

}
