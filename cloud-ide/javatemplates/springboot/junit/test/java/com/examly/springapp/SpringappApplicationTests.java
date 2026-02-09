package com.examly.springapp;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import jakarta.persistence.OneToMany;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;
import java.lang.reflect.Field;


@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    void shouldAddNewTeacherAndReturnCreatedStatus() throws Exception {
        String teacherJson = "{\"teacherId\":1, \"teacherName\": \"Test Teacher 1\", \"subject\": \"Math\", \"yearsOfExperience\": 5 }";
                mockMvc.perform(MockMvcRequestBuilders.post("/teacher")
                .contentType(MediaType.APPLICATION_JSON)
                .content(teacherJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(jsonPath("$.teacherName").value("Test Teacher 1"))
                .andExpect(jsonPath("$.subject").value("Math"))
                .andExpect(jsonPath("$.yearsOfExperience").value(5))
                .andReturn();
    }

   

    @Test
    @Order(2)
    void shouldReturnTeacherDetailsById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/teacher/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.teacherName").value("Test Teacher 1"))
                .andExpect(jsonPath("$.subject").value("Math"))
                .andExpect(jsonPath("$.yearsOfExperience").value(5));
               
    }



    @Test
    @Order(3)
    void shouldFetchAllTeachersSortedByExperience() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/teacher/byexperience")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$[0].yearsOfExperience").value(5));
    }




    @Test
    @Order(4)
    void shouldReturnConflictForDuplicateTeacherEntry() throws Exception {
        String teacherJson = "{\"teacherId\":1, \"teacherName\": \"Test Teacher 1\", \"subject\": \"Math\", \"yearsOfExperience\": 5 }";
        mockMvc.perform(MockMvcRequestBuilders.post("/teacher")
                .contentType(MediaType.APPLICATION_JSON)
                .content(teacherJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andExpect(content().string("Teacher with name Test Teacher 1 already exists!"));
}


@Test
@Order(5)
void shouldAddStudentToTeacherAndReturnCreatedStatus() throws Exception {
    String studentJson = "{\"studentId\":1, \"name\": \"Test Student 1\", \"age\": 20, \"grade\": \"A\" }";
    mockMvc.perform(MockMvcRequestBuilders.post("/teacher/1/student")
            .contentType(MediaType.APPLICATION_JSON)
            .content(studentJson)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(jsonPath("$.name").value("Test Student 1"))
            .andExpect(jsonPath("$.age").value(20))
            .andExpect(jsonPath("$.grade").value("A"))
            .andReturn();
}


@Test
@Order(6)
void shouldFetchAllStudentsSuccessfully() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/student")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(jsonPath("$[0].name").value("Test Student 1"))
            .andExpect(jsonPath("$[0].age").value(20))
            .andExpect(jsonPath("$[0].grade").value("A"));
}


@Test
 @Order(7)
    void shouldDeleteStudentAndReturnSuccessMessage() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/student/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Student 1 deleted successfully"));
    }



    @Test
     public void shouldVerifyOneToManyAnnotationOnTeacherStudentsField() {
         try {
             Class<?> teacherClass = Class.forName("com.examly.springapp.model.Teacher");
             Field studentsField = teacherClass.getDeclaredField("students");
             OneToMany oneToManyAnnotation = studentsField.getAnnotation(OneToMany.class);
 
             assertNotNull(oneToManyAnnotation, "@OneToMany annotation should be present on 'students' field in Teacher class");
         } catch (ClassNotFoundException e) {
             fail("Owner class not found");
         } catch (NoSuchFieldException e) {
             fail("Field 'Students' not found in Teacher class");
         }
     }


    @Test
    public void shouldVerifyControllerFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void shouldConfirmTeacherControllerFileExists() {
        String filePath = "src/main/java/com/examly/springapp/controller/TeacherController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }


    @Test
    public void shouldConfirmStudentControllerFileExists() {
        String filePath = "src/main/java/com/examly/springapp/controller/StudentController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }




    @Test
    public void shouldVerifyModelFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void shouldConfirmTeacherModelFileExists() {
        String filePath = "src/main/java/com/examly/springapp/model/Teacher.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldConfirmStudentModelFileExists() {
        String filePath = "src/main/java/com/examly/springapp/model/Student.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldVerifyRepositoryFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void shouldConfirmTeacherRepositoryFileExists() {
        String filePath = "src/main/java/com/examly/springapp/repository/TeacherRepo.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldConfirmStudentRepositoryFileExists() {
        String filePath = "src/main/java/com/examly/springapp/repository/StudentRepo.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldVerifyServiceFolderExists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void shouldConfirmTeacherServiceFileExists() {
        String filePath = "src/main/java/com/examly/springapp/service/TeacherService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldConfirmStudentServiceFileExists() {
        String filePath = "src/main/java/com/examly/springapp/service/StudentService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldVerifyTeacherServiceImplFilePresence() {
        String filePath = "src/main/java/com/examly/springapp/service/TeacherServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void shouldVerifyStudentServiceImplFilePresence() {
        String filePath = "src/main/java/com/examly/springapp/service/StudentServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }
}