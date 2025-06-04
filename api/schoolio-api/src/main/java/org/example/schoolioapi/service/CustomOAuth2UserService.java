package org.example.schoolioapi.service;

import org.example.schoolioapi.service.UserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

    public CustomOAuth2UserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        userService.saveUser(oAuth2User);

        return new DefaultOAuth2User(
                Collections.singleton(() -> "ROLE_USER"),
                oAuth2User.getAttributes(),
                "email"
        );
    }
}