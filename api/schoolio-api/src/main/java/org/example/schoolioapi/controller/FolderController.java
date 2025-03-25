package org.example.schoolioapi.controller;

import org.example.schoolioapi.DTO.Folder.FolderDTO;
import org.example.schoolioapi.DTO.Folder.FolderDetailedDTO;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.service.FolderService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.ResponseEntity.status;

@RestController
@CrossOrigin
@RequestMapping("/folders")
public class FolderController {
    private final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/{id}")
    @Cacheable(value = "folderDTO", key = "#id")
    public FolderDetailedDTO getFolderById(@PathVariable Long id) {
        return FolderDetailedDTO.from(folderService.getFolderById(id));
    }

    @PostMapping
    public ResponseEntity<Long> createFolder(@RequestBody final FolderDTO folderDTO) {
        final Long createdId = folderService.create(folderDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/subfolders")
    public List<FolderDTO> getFolderSubfolders(@PathVariable Long id) {
        return folderService.getFolderSubfolders(id);
    }

    //TODO transaction should undo invalid folder creation
    @PostMapping("/{id}/subfolders")
    @CacheEvict(value = "folderDTO", key = "#id")
    public ResponseEntity<String> addSubFolder(@PathVariable Long id, @RequestBody FolderDTO folderDTO) {
        try {
            Long childFolderId = folderService.create(folderDTO);
            folderService.addSubFolderToFolder(id, childFolderId);
            Folder parent = folderService.getFolderById(id);
            return ResponseEntity.ok(FolderDTO.from(parent).toString());
        } catch (Exception e) {
            return status(BAD_REQUEST).body(e.getMessage());
        }
    }
}
