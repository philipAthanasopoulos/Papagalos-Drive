#generate jar file with maven
FROM maven:3.8.5-openjdk-18-slim as build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

#run jar file
FROM openjdk:22-jdk
COPY target/*.jar /api.jar
ENTRYPOINT ["java","-jar","/api.jar"]
EXPOSE 8080