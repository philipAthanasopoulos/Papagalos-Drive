package org.example.schoolioapi.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany
    private List<Folder> subFolders = new ArrayList<>();
    @OneToMany
    private List<Note> notes = new ArrayList<>();
    @ManyToOne
    private Folder parent;

    public Folder(String name) {
        this.name = name;
    }

    public String getPath(){
        return this.parent==null ? this.name : this.parent.getPath() + "/" + this.name;
    }

    public void addNote(Note note) {
        if (this.notes == null) this.notes = new ArrayList<>();
        notes.add(note);
    }

    public void addSubFolder(Folder subFolder) {
        if (this.subFolders == null) this.subFolders = new ArrayList<>();
        subFolders.add(subFolder);
    }
}


