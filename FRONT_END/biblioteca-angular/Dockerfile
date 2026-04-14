# ==========================================================
# Semana 5 - Dockerfile para FrontEnd Angular
# Proyecto: biblioteca-angular
# ==========================================================
#
# Este archivo construye y publica la aplicación Angular
# usando una estrategia de 2 etapas:
#
# Etapa 1:
# - Usa Node para instalar dependencias
# - Compila la aplicación en modo producción
#
# Etapa 2:
# - Usa Nginx para servir los archivos estáticos generados
#
# Requisito previo:
# - El proyecto Angular debe compilar correctamente
# ==========================================================

# ----------------------------------------------------------
# Etapa 1: Build de la aplicación Angular
# ----------------------------------------------------------
FROM node:20 AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias del proyecto
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos Angular en modo producción
RUN npm run build -- --configuration production


# ----------------------------------------------------------
# Etapa 2: Publicación con Nginx
# ----------------------------------------------------------
FROM nginx:alpine

# Copiamos el resultado del build al directorio público de Nginx
COPY --from=build /app/dist/biblioteca-angular/browser /usr/share/nginx/html

# Exponemos el puerto 80 dentro del contenedor
EXPOSE 80

# Iniciamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]