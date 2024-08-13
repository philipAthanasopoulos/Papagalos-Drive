package org.example.schoolioapi.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToMany
    private List<Folder> subFolders = new ArrayList<>();

    @OneToMany
    private List<Note> notes;

    public Folder(String name) {
        this.name = name;
    }

    public Folder() {
    }

    public void addNote(Note note) {
        if (this.notes == null) notes = List.of(note);
        else notes.add(note);
    }

    public void addSubFolder(Folder subFolder) {
        subFolders.add(subFolder);
    }
}


