package org.example.schoolioapi.controller;

import org.bson.types.Binary;
import org.example.schoolioapi.service.NoteBlobService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class NoteBlobController {
    private final NoteBlobService noteBlobService;

    public NoteBlobController(NoteBlobService noteBlobService) {
        this.noteBlobService = noteBlobService;
    }

    @GetMapping("/blob/{id}")
    public Binary getNoteBlobById(@PathVariable String id) {
        return noteBlobService.getNoteBlobById(id).getData();
    }
}
