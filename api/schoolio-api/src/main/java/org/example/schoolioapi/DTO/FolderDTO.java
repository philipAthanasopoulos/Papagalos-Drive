package org.example.schoolioapi.DTO;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class FolderDTO implements Serializable {
    private Long Id;
    private String name;
    private List<Long> subFolderIds;
    private List<String> subFolderNames;
    private List<String> noteBlobIds;
    private List<String> noteNames;
}
