package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.Note.NoteDTO;
import org.example.schoolioapi.DTO.User.UserDTO;
import org.example.schoolioapi.domain.Note;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.repository.NoteRepository;
import org.example.schoolioapi.repository.UserRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    public UserService(UserRepository userRepository, NoteRepository noteRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
    }

    public void saveUser(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepository.findByEmail(email).orElse(new User());
        user.setEmail(email);
        user.setFirstName(name.split(" ")[0]);
        user.setLastName(name.split(" ")[1]);
        userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDTO> getUsersDTO() {
        return null;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<NoteDTO> getNotesByUserId(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return user.getFavoriteNotes().stream().map(NoteDTO::from).collect(Collectors.toList());
    }

    public void addNoteToUser(User user, Note note) {
        user = userRepository.findById(user.getId()).orElse(null);
        user.getFavoriteNotes().add(note);
        userRepository.save(user);
    }

    public void removeFavoriteNoteFromUser(User user, Long noteId) {
        user = userRepository.findById(user.getId()).orElse(null);
        Note note = noteRepository.findById(noteId).orElse(null);
        user.getFavoriteNotes().remove(note);
        userRepository.save(user);
    }
}