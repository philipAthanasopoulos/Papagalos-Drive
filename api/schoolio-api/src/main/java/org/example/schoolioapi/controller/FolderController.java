package org.example.schoolioapi.controller;

import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FolderController {
    private final FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folder/{id}")
    public Folder getFolderById(@PathVariable String id) {
        return folderService.getFolderById(id).orElse(null);
    }

    @GetMapping("/folder/all")
    public List<Folder> getAllFolders() {
        return folderService.getAllFolders();
    }

    @GetMapping("/folder/root")
    public Folder getRootFolder() {
        return folderService.getRootFolder();
    }

//    @PostMapping("/folder/add")
//    public void addSubFolder(@RequestParam String parentFolderId, @RequestParam String subfolderName) {
//        Folder parentFolder = folderService.getFolderById(parentFolderId).orElse(null);
//        Folder newFolder = folderService.saveFolder(new Folder(subfolderName));
//        folderService.addSubFolderToFolder(parentFolder, newFolder);
//    }
}
