package org.example.schoolioapi.service;

import org.example.schoolioapi.domain.NoteBlob;
import org.example.schoolioapi.repository.NoteBlobRepository;
import org.springframework.stereotype.Service;

@Service
public class NoteBlobService {
    private final NoteBlobRepository noteBlobRepository;

    public NoteBlobService(NoteBlobRepository noteBlobRepository) {
        this.noteBlobRepository = noteBlobRepository;
    }

    public NoteBlob saveNoteBlob(NoteBlob blob){
        return noteBlobRepository.save(blob);
    }

    public NoteBlob getNoteBlobById(String id){
        return noteBlobRepository.findById(id).orElse(null);
    }

    public void deleteNoteBlobById(String id){
        noteBlobRepository.deleteById(id);
    }

}
