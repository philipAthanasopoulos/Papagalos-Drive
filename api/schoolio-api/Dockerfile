FROM openjdk:22-jdk
COPY target/*.jar /api.jar

ARG PSQL_DATABASE_URL
ARG PSQL_DATABASE_USERNAME
ARG PSQL_DATABASE_PASSWORD

ENV PSQL_DATABASE_URL=${PSQL_DATABASE_URL}
ENV PSQL_DATABASE_USERNAME=${PSQL_DATABASE_USERNAME}
ENV PSQL_DATABASE_PASSWORD=${PSQL_DATABASE_PASSWORD}

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/api.jar", "--spring.profiles.active=prod"]