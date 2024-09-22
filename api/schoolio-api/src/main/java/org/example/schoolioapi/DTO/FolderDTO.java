package org.example.schoolioapi.DTO;

import lombok.Builder;
import org.example.schoolioapi.domain.Folder;

import java.util.List;

@Builder
public record FolderDTO(
        Long id,
        String name,
        List<Long> subFolderIds,
        List<String> subFolderNames,
        List<NoteDTO> notes,
        String path
) {
    public static FolderDTO from(Folder folder) {
        if (folder == null) return null;
        return FolderDTO.builder()
                .id(folder.getId())
                .name(folder.getName())
                .subFolderIds(folder.getSubFolders().stream().map(Folder::getId).toList())
                .subFolderNames(folder.getSubFolders().stream().map(Folder::getName).toList())
                .notes(folder.getNotes().stream().map(NoteDTO::from).toList())
                .path(folder.getPath())
                .build();
    }
}



