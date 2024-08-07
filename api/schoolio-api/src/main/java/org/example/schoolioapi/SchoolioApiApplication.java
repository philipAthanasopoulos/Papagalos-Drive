package org.example.schoolioapi;

import org.example.schoolioapi.service.FolderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication()
public class SchoolioApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(SchoolioApiApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(FolderService folderService) {
        return args -> {
//            Folder rootFolder = folderService.getRootFolder();
//
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode jsonNode = mapper.readTree(new File("C:\\Users\\Dell\\Desktop\\GitHub projects\\Schoolio\\database\\institutions.json"));
//            List<JsonNode> institutions = jsonNode.findValues("Τμήματα");
//            for (JsonNode institution : institutions) {
//                String institutionName = institution.findValue("Ίδρυμα").asText();
//                List<JsonNode> departments = institution.findValues("Τμήμα");
//
//                folderService.addSubFolderToFolder(rootFolder, new Folder(institutionName));
//                Folder institutionFolder = folderService.getFolderByName(institutionName);
//                departments.forEach(department -> folderService.addSubFolderToFolder(institutionFolder, new Folder(department.asText())));
//            }

        };
    }
}