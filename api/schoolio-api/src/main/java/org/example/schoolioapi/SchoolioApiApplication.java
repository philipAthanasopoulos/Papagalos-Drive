package org.example.schoolioapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Arrays;

@SpringBootApplication()
@EnableCaching
@EnableScheduling
public class SchoolioApiApplication {

    @Autowired
    private Environment environment;

    @Autowired
    public void setEnvironment(Environment environment) {
        System.out.println("Active Profiles: " + Arrays.toString(environment.getActiveProfiles()));
        System.out.println("Property 'spring.datasource.url': " + environment.getProperty("spring.datasource.url"));
    }

    public static void main(String[] args) {
        SpringApplication.run(SchoolioApiApplication.class, args);
    }

//    @Bean
//    @Transactional
//    public CommandLineRunner run(FolderService folderService) {
//        return args -> {
//            Folder rootFolder = folderService.saveFolder(new Folder("root"));
//
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode jsonNode = mapper.readTree(new File("C:\\Users\\Dell\\Desktop\\GitHub projects\\Schoolio\\database\\institutions.json"));
//            List<JsonNode> institutions = jsonNode.findValues("Τμήματα");
//            for (JsonNode institution : institutions) {
//                String institutionName = institution.findValue("Ίδρυμα").asText();
//                List<JsonNode> departments = institution.findValues("Τμήμα");
//                Folder institutionFolder = new Folder(institutionName);
//                folderService.addSubFolderToFolder(folderService.getFolderByName("root"), institutionFolder);
//                for (JsonNode department : departments) {
//                    System.out.println("Adding " + department.asText() + " to " + institutionName);
//                    folderService.addSubFolderToFolder(folderService.getFolderByName(institutionName), new Folder(department.asText()));
//                }
//            }
//        };
//    }

}
