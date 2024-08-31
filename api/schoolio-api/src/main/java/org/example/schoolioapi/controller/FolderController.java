package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.FolderDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.service.FolderService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
public class FolderController {
    private final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folder/{id}")
    @Cacheable(value = "folderDTO", key = "#id")
    public FolderDTO getFolderById(@PathVariable Long id) {
        return folderService.getFolderDTOById(id);
    }

    @GetMapping("/folder/all")
    public List<Folder> getAllFolders() {
        return folderService.getAllFolders();
    }

    @GetMapping("/folder/root")
    public Folder getRootFolder() {
        return folderService.getRootFolder();
    }

    @PostMapping("/folder/{id}/addSubFolder")
    @CacheEvict(value = "folderDTO", key = "#id")
    public void addSubFolder(@PathVariable Long id, @RequestParam String subFolderName) {
        Folder parentFolder = folderService.getFolderById(id);
        Folder newFolder = new Folder(subFolderName);
        folderService.addSubFolderToFolder(parentFolder, newFolder);
    }
}
