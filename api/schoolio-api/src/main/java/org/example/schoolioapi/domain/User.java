//package org.example.schoolioapi.domain;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.Data;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.List;
//
//@Entity
//@Table(name = "users")
//@Data
//public class User implements UserDetails {
//    @Id
//    private Long id;
//    private String name;
//    private String email;
//    private String profilePhoto;
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of();
//    }
//
//    @Override
//    public String getPassword() {
//        return "";
//    }
//
//    @Override
//    public String getUsername() {
//        return "";
//    }
//}
