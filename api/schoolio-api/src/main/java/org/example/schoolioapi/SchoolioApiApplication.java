package org.example.schoolioapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.schoolioapi.domain.Folder;
import org.example.schoolioapi.service.FolderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@SpringBootApplication()
@EnableCaching
@EnableScheduling
public class SchoolioApiApplication {
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
