package org.example.schoolioapi.service;

import org.example.schoolioapi.DTO.UserDTO;
import org.example.schoolioapi.domain.User;
import org.example.schoolioapi.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getUsersDTO(){
        return userRepository.findAll()
                .stream()
                .map(UserDTO::from)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public User save(User user) {
        try {
            User newUser = userRepository.save(user);
            System.out.println("User saved");
            return newUser;
        } catch (DataIntegrityViolationException e) {
            System.out.println("Email already exists");
            return null;
        }
    }
}
