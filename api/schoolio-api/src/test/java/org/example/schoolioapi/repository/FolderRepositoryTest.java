package org.example.schoolioapi.repository;

import org.apache.catalina.mbeans.ContextEnvironmentMBean;
import org.example.schoolioapi.domain.Folder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class FolderRepositoryTest {

    @Autowired
    private Environment environment;

    @Autowired
    private FolderRepository folderRepository;

    @BeforeEach
    void setUp() {
        System.out.println("Profiles: " + Arrays.toString(environment.getActiveProfiles()));
        folderRepository.save(new Folder("animals"));
    }

    @Test
    void findByName() {
        assertNotNull(folderRepository.findByName("animals"));
        assertNull(folderRepository.findByName("aliens"));
    }

}