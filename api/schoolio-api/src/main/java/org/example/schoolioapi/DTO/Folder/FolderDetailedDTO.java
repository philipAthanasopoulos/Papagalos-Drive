package org.example.schoolioapi.DTO.Folder;

import lombok.Builder;
import org.example.schoolioapi.DTO.Note.NoteDTO;
import org.example.schoolioapi.domain.Folder;

import java.util.List;

@Builder
public record FolderDetailedDTO(
        Long id,
        String name,
        FolderDTO parentFolder,
        List<FolderDTO> subFolders,
        List<NoteDTO> notes

) {
    public static FolderDetailedDTO from(Folder folder) {
        if (folder == null) return null;
        return FolderDetailedDTO.builder()
                .id(folder.getId())
                .name(folder.getName())
                .parentFolder(FolderDTO.from(folder.getParent()))
                .subFolders(folder.getSubFolders().stream().map(FolderDTO::from).toList())
                .notes(folder.getNotes().stream().map(NoteDTO::from).toList())
                .build();
    }
}
