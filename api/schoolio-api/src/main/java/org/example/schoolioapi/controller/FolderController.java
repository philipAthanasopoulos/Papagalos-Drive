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

    //TODO
    //Enable when production ready
//    @PatchMapping("/folder/{id}")
//    @CacheEvict(value = "folderDTO", key = "#id")
//    public ResponseEntity<FolderDTO> updateFolder(@PathVariable Long id, @RequestBody FolderDTO folderDTO) {
//        try {
//            Folder updateFolder = this.folderService.updateFields(id, folderDTO);
//            return ResponseEntity.ok(FolderDTO.from(updateFolder));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }

    @PostMapping("/folder/{id}/subfolders")
    @CacheEvict(value = "folderDTO", key = "#id")
    public ResponseEntity<String> addSubFolder(@PathVariable Long id, @RequestParam String subFolderName) {
        try {
            Folder newFolder = folderService.saveFolder(Folder.builder().name(subFolderName).build());
            folderService.addSubFolderToFolder(id, newFolder.getId());
            Folder parent = folderService.getFolderById(id);
            return ResponseEntity.ok(FolderDTO.from(parent).toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
