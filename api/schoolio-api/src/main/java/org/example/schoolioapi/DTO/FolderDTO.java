package org.example.schoolioapi.DTO;

import lombok.Builder;
import org.example.schoolioapi.domain.Note;

import java.util.List;

@Builder
public record FolderDTO(
    Long Id,
    String name,
    List<Long> subFolderIds,
    List<String> subFolderNames,
    List<NoteDTO> notes,
    String path
) {
}



