package org.example.schoolioapi.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.schoolioapi.domain.User;

@Builder
public record UserDTO(
        String name,
        String email,
        String profilePhoto ) {


    public UserDTO(User user){
        this(user.getName(),user.getEmail(),user.getProfilePhoto());
    }
}
