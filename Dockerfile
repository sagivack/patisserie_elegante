# Utiliser une image légère de Node.js
FROM node:18-alpine

# Créer le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Compiler le TypeScript en JavaScript
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
