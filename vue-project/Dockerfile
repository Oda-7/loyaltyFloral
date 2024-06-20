# FROM node:lts-alpine 

# WORKDIR /app

# COPY package*.json ./

# RUN npm install -g npm@latest
# # RUN rm -rf node_modules package-lock.json

# RUN npm install
# RUN npm install @rollup/rollup-linux-x64-musl@4.16.1

# COPY . .

# RUN npm run build

# EXPOSE 5173

# CMD [ "npm", "run", "dev" ]

# Étape 1 : Construire l'application Vue.js
FROM node:lts-alpine3.13 as build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Construire l'application en mode production
RUN npm run build

# Vérification que le répertoire dist est créé
RUN ls -l /app/dist

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:stable-alpine as production-stage

# Copier l'application construite depuis l'étape précédente
COPY --from=build-stage /app/dist /usr/share/nginx/html/

# Copier le fichier de configuration nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 8080

# Démarrer Nginx pour servir l'application
CMD ["nginx", "-g", "daemon off;"]

