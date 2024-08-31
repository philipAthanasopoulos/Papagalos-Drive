package org.example.schoolioapi.heartbeat;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * This class performs an HTTP request every X minutes
 * so that the api doesn't freeze dew to inactivity on Render.
 */

@Component
public class Espresso {

    @Scheduled(fixedDelay = 10 * 60000)
    public void drinkEspresso() {
        RestTemplate restTemplate = new RestTemplate();
        String localhost = "http://localhost:8080/folder/1";
        restTemplate.getForEntity(localhost, String.class);
        System.out.println("Ping");
    }
}
