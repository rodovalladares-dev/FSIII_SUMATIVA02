# ==========================================================
# Semana 5 - Dockerfile para microservicio Spring Boot
# Microservicio: Libros
# ==========================================================
#
# ¿Qué hace este archivo?
# - Usa una imagen base con Java 21
# - Define una carpeta de trabajo dentro del contenedor
# - Copia el archivo .jar generado por Maven
# - Expone el puerto 8081
# - Ejecuta el microservicio usando el perfil "docker"
#
# Requisito previo:
# Debes haber ejecutado antes:
# mvn clean package
#
# Importante:
# Este microservicio fue compilado con Java 21,
# por lo tanto la imagen base también debe usar Java 21.
# ==========================================================

# Imagen base con Java 21
FROM eclipse-temurin:21-jdk

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo .jar generado por Maven al contenedor
# El archivo se renombra como app.jar para simplificar su ejecución
COPY target/*.jar app.jar


# Exponemos el puerto en el que corre el microservicio
EXPOSE 8081

# Comando que inicia la aplicación Spring Boot
# Se activa el perfil "docker" para usar application-docker.properties
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]