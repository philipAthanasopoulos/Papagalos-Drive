package org.example.schoolioapi.domain;


import jakarta.persistence.Id;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class NoteBlob {
    @Id
    private String id;
    private Binary data;

    public NoteBlob(Binary data) {
        this.data = data;
    }
}
