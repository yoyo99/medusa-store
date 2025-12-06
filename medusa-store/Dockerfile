FROM node:22-slim

WORKDIR /app

# Installation des outils système requis pour Medusa (Python, make, g++)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Installation des dépendances
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install

# Copie du code source (tout le reste)
COPY . .

# Configuration Environnement de Build
ENV NODE_ENV=production

# Construction de l'application (Admin + Backend)
RUN npm run build

# Configuration Environnement de Démarrage
ENV HOST=0.0.0.0
ENV PORT=9000

# Ouverture du port
EXPOSE 9000

# Démarrage : Migrations DB -> Sync Links (Important pour Medusa) -> Start
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
