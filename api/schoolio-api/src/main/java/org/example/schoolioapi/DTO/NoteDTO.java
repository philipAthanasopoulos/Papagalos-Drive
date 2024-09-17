package org.example.schoolioapi.DTO;

import lombok.Builder;
import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;

import java.util.Date;


@Builder
public record NoteDTO(
         Long id,
         String name,
         FileType type,
         String mongoId,
         Date uploadDate,
         String path
) {
    public static NoteDTO from(Note note){
        return NoteDTO.builder()
                .id(note.getId())
                .name(note.getName())
                .type(note.getType())
                .mongoId(note.getMongoId())
                .uploadDate(note.getUploadDate())
                .path(note.getParentFolder().getPath() + "/" + note.getName())
                .build();
    }
}
