package org.example.schoolioapi.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.schoolioapi.DTO.Note.NoteDTO;
import org.example.schoolioapi.DTO.User.UserDTO;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("users/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsersDTO();
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(UserDTO.from(userService.getUserById(id)));
    }

    @GetMapping("/{id}/notes")
    public ResponseEntity<List<NoteDTO>> getUserNotes(@PathVariable Long id, HttpServletRequest request) {
        System.out.println(request.getCookies());

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User authenticatedUser = (User) session.getAttribute("user");
        if (!authenticatedUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<NoteDTO> notes = userService.getNotesByUserId(id);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<NoteDTO> addFavoriteNoteToUser(@PathVariable Long id, @RequestBody NoteDTO noteDTO, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User authenticatedUser = (User) session.getAttribute("user");
        if (!authenticatedUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.addNoteToUser(authenticatedUser, NoteDTO.toNote(noteDTO));
        return ResponseEntity.ok(noteDTO);
    }

    @DeleteMapping("/{userId}/notes/{noteId}")
    public ResponseEntity<?> deleteNote(@PathVariable Long userId, @PathVariable Long noteId,  HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User authenticatedUser = (User) session.getAttribute("user");
        if (!authenticatedUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.removeFavoriteNoteFromUser(authenticatedUser,noteId);
        return ResponseEntity.ok().build();

    }

}
