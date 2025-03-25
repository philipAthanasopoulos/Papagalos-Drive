package org.example.schoolioapi.DTO.Folder;

import lombok.Builder;
import org.example.schoolioapi.domain.Folder;

@Builder
public record FolderDTO(
        Long id,
        String name
) {
    public static FolderDTO from(Folder folder) {
        if (folder == null) return null;
        return FolderDTO.builder()
                .id(folder.getId())
                .name(folder.getName())
                .build();
    }
}



