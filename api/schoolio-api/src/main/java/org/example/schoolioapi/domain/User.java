package org.example.schoolioapi.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Philip Athanasopoulos
 */
@Document
@Data
@AllArgsConstructor
public class User {
    @Id
    private String username;
}
