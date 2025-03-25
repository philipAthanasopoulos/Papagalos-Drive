package org.example.schoolioapi.DTO.Note;

import lombok.Builder;
import org.example.schoolioapi.domain.FileType;
import org.example.schoolioapi.domain.Note;

import java.util.Date;

@Builder
public record NoteDTODetailed(
        Long id,
        String name,
        FileType type,
        Date uploadDate,
        byte[] data
) {
    public static NoteDTODetailed from(Note note) {
        return NoteDTODetailed.builder()
                .id(note.getId())
                .name(note.getName())
                .type(note.getType())
                .uploadDate(note.getUploadDate())
                .data(note.getData())
                .build();
    }

    public static Note toNote(NoteDTODetailed noteDTODetailed) {
        return Note.builder()
                .name(noteDTODetailed.name)
                .type(noteDTODetailed.type)
                .uploadDate(noteDTODetailed.uploadDate)
                .data(noteDTODetailed.data)
                .build();
    }
}
