# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Activar corepack y fijar versión compatible de pnpm
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Instalar dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Build de producción
RUN pnpm run build

# Etapa final
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist ./dist