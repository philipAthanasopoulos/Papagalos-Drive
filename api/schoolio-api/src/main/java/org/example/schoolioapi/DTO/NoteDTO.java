package org.example.schoolioapi.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.schoolioapi.domain.FileType;

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
}
