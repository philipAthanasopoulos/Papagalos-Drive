package org.example.schoolioapi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Note {
    @Id
    @GeneratedValue(generator = "Incremental")
    private Long id;
    private String name;
    private FileType type;
    private String mongoId;

    public Note(String name, FileType type, String mongoId) {
        this.name = name;
        this.type = type;
        this.mongoId = mongoId;
    }

    public Note() {

    }
}
