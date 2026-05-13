# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Build de producción
RUN npm run build

# Etapa final (solo genera dist, no sirve nada)
FROM alpine:latest

WORKDIR /app
COPY --from=build /app/dist ./dist