package org.example.schoolioapi.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Philip Athanasopoulos
 */
@Data
@AllArgsConstructor
public class Address {
    private String country;
    private String city;
    private String postCode;
}
