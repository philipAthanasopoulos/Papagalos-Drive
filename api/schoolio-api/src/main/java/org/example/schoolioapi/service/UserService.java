//package org.example.schoolioapi.service;
//
//import org.example.schoolioapi.DTO.UserDTO;
//import org.example.schoolioapi.domain.User;
//import org.example.schoolioapi.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//    private final UserRepository userRepository;
//
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public User getUserById(Long id) {
//        return userRepository.findById(id).orElse(null);
//    }
//
//    public UserDTO getUserDTOById(Long id) {
//        return new UserDTO(getUserById(id));
//    }
//
//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }
//
//    public void deleteUser(User user) {
//        userRepository.delete(user);
//    }
//
//    public User validateUser(String email, String password) {
//        User user = userRepository.findByEmail(email);
//        if (user.getPassword().equals(password)) return user;
//        return null;
//    }
//}
