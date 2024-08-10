package org.example.schoolioapi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Folder {
    @Id
    @GeneratedValue(generator = "Incremental")
    private Long id;
    private String name;
    @OneToMany
    private List<Folder> subFolders;
    @OneToMany
    private List<Note> notes;

    public Folder(String name) {
        this.name = name;
        this.subFolders = new ArrayList<>();
        this.notes = new ArrayList<>();
    }

    public Folder() {

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


