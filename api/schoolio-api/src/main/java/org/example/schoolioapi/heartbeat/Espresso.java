package org.example.schoolioapi.heartbeat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * This class performs an HTTP request every X minutes
 * so that the api doesn't freeze dew to inactivity on Render.
 */

@Component
public class Espresso {

    private static final Logger logger = LoggerFactory.getLogger(Espresso.class);

    @Scheduled(fixedDelay = 3 * 60000)
    public void drinkEspresso() {
        RestTemplate restTemplate = new RestTemplate();
        String localhost = "https://schoolio.onrender.com/folders/1";
        try {
            restTemplate.getForEntity(localhost, String.class);
            logger.info("Ping");
        } catch (RestClientException e) {
            logger.error("Failed to ping health check endpoint: {}", e.getMessage(), e);
        }
    }
}
