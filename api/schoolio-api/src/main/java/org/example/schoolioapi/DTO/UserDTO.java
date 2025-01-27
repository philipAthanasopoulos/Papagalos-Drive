package org.example.schoolioapi.DTO;

import lombok.Builder;
import org.example.schoolioapi.domain.User;

@Builder
public record UserDTO(String firstName,
                      String lastName,
                      String email) {

    public static UserDTO from(User user) {
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
