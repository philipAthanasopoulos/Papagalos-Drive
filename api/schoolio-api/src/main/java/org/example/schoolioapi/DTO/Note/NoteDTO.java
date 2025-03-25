package org.example.schoolioapi.DTO.Note;

import lombok.Builder;
import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;

import java.util.Date;


@Builder
public record NoteDTO(
         Long id,
         String name,
         FileType type,
         Date uploadDate
) {
    public static NoteDTO from(Note note){
        return NoteDTO.builder()
                .id(note.getId())
                .name(note.getName())
                .type(note.getType())
                .uploadDate(note.getUploadDate())
                .build();
    }

    public static Note toNote(NoteDTO noteDTO){
        return Note.builder()
                .name(noteDTO.name)
                .type(noteDTO.type)
                .uploadDate(noteDTO.uploadDate)
                .build();
    }
}
