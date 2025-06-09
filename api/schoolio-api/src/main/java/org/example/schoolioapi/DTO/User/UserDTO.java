package org.example.schoolioapi.DTO.User;

import lombok.Builder;
import org.example.schoolioapi.domain.User;

@Builder
public record UserDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        int grapes) {

    public static UserDTO from(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .grapes(user.getGrapes())
                .build();
    }
}
