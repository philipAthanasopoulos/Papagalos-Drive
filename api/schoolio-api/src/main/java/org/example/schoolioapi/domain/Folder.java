package org.example.schoolioapi.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "folders")
@Data
public class Folder {
    @Id
    private String id;
    private String name;
    @DBRef
    private List<Folder> subFolders;
    @DBRef
    private List<Note> notes;

    public Folder(String name) {
        this.name = name;
        this.subFolders = new ArrayList<>();
        this.notes = new ArrayList<>();
    }

    public void addNote(Note note) {
        if (this.notes == null) notes = List.of(note);
        else notes.add(note);
    }

    public void addSubFolder(Folder subFolder) {
        if (this.subFolders == null) subFolders = List.of(subFolder);
        else subFolders.add(subFolder);
    }
}


