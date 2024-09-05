package org.example.schoolioapi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Folder> subFolders = new ArrayList<>();
    @OneToMany(fetch = FetchType.EAGER)
    private List<Note> notes;
    @ManyToOne(fetch = FetchType.EAGER)
    private Folder parent;

    public Folder(String name) {
        this.name = name;
    }

    public String getPath(){
        return this.parent==null ? this.name : this.parent.getPath() + "/" + this.name;
    }

    public void addNote(Note note) {
        if (this.notes == null) notes = List.of(note);
        else notes.add(note);
    }

    public void addSubFolder(Folder subFolder) {
        subFolders.add(subFolder);
    }
}


