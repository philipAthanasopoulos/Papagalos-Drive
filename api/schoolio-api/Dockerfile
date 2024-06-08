FROM openjdk:22-jdk
COPY target/*.jar /api.jar
ENTRYPOINT ["java","-jar","/api.jar"]
EXPOSE 8080