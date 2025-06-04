package org.example.schoolioapi.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {
    @Id
    @GeneratedValue(generator = "Incremental")
    private Long id;
    private String name;
    private FileType type;
    private Date uploadDate;
    @ManyToOne
    private Folder parentFolder;
    @Lob
    private byte[] data;
    @ManyToMany
    List<User> usersWhoFavorite = new ArrayList<>();
}
