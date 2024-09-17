//package org.example.schoolioapi.security;
//
//import com.nimbusds.oauth2.sdk.http.HTTPRequest;
//import org.apache.coyote.Request;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000","http://localhost:63342"));
//        configuration.setAllowedMethods(List.of(
//                HTTPRequest.Method.GET.name(),
//                HTTPRequest.Method.POST.name(),
//                HTTPRequest.Method.DELETE.name(),
//                HTTPRequest.Method.PUT.name(),
//                "PATCH"
//        ));
//        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setExposedHeaders(List.of("Authorization"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(c -> c.configurationSource(corsConfigurationSource()))
//                .csrf(AbstractHttpConfigurer::disable)
//                .oauth2Login(withDefaults())
//                .authorizeHttpRequests(requests -> requests
////                        .requestMatchers("/login", "/oauth2/**", "resources/**").permitAll()
//                        .anyRequest().permitAll());
//        return http.build();
//    }
//}