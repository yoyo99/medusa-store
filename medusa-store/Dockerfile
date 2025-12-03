# 1. On part d'une image Node.js officielle (version 22)
FROM node:22-slim

# 2. On définit le dossier de travail
WORKDIR /app

# 3. On installe les outils nécessaires pour compiler certains modules (Python, etc.)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 4. On copie les fichiers de définition des dépendances
COPY package.json yarn.lock* package-lock.json* ./

# 5. On installe les dépendances
RUN npm install

# 6. On copie tout le reste du code source
COPY . .

# 7. On construit le projet (C'est l'étape qui manquait avec Nixpacks !)
# Cela va créer le dossier .medusa/server et l'admin panel
RUN npm run build

# 8. On définit les variables d'environnement cruciales pour Docker
ENV HOST=0.0.0.0
ENV PORT=9000
ENV NODE_ENV=production

# 9. On ouvre le port 9000
EXPOSE 9000

# 10. La commande de démarrage ultime
# Elle fait les migrations, synchronise les liens et lance le serveur
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
