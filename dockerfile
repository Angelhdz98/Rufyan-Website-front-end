# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: nginx
FROM nginx:alpine


# Copiar build
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
