package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.FolderDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.service.FolderService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FolderController {
    private final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folder/{id}")
    @Cacheable(value = "folderDTO", key = "#id")
    public FolderDTO getFolderById(@PathVariable Long id) {
        return folderService.getFolderByIdAsDTO(id);
    }

    @PatchMapping("/folder/{id}")
    @CacheEvict(value = "folderDTO", key = "#id")
    public ResponseEntity<FolderDTO> updateFolder(@PathVariable Long id, @RequestBody FolderDTO folderDTO) {
        try {
            Folder patched = this.folderService.updateFields(id, folderDTO);
            return ResponseEntity.ok(FolderDTO.from(patched));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @PostMapping("/folder/{id}/subfolders")
    @CacheEvict(value = "folderDTO", key = "#id")
    public ResponseEntity<String> addSubFolder(@PathVariable Long id, @RequestParam String subFolderName) {
        Folder parentFolder = folderService.getFolderById(id);
        Folder newFolder = new Folder(subFolderName);
        try {
            Folder updatedFolder = folderService.addSubFolderToFolder(parentFolder, newFolder);
            return ResponseEntity.ok(FolderDTO.from(updatedFolder).toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
