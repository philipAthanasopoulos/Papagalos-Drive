package org.example.schoolioapi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(generator = "Incremental")
    private Long id;
    private String name;
    private FileType type;
    private String mongoId;
    private Date uploadDate;
    @ManyToOne
    private Folder parentFolder;

    public Note(String name, FileType type, String mongoId, Folder parentFolder) {
        this.name = name;
        this.type = type;
        this.mongoId = mongoId;
        this.uploadDate = new Date();
        this.parentFolder = parentFolder;
    }

}
