# 1. On part d'une image Node.js officielle (version 22)
FROM node:22-slim

# 2. On définit le dossier de travail
WORKDIR /app

# 3. On installe les outils nécessaires
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 4. On copie les dépendances
COPY package.json yarn.lock* package-lock.json* ./

# 5. On installe
RUN npm install

# 6. On copie le code
COPY . .

# 7. On construit le projet
RUN npm run build

# 8. VARIABLES CRUCIALES (J'ai enlevé les # pour qu'elles soient actives)
ENV HOST=0.0.0.0
ENV PORT=9000
ENV NODE_ENV=production

# 9. On ouvre le port
EXPOSE 9000

# 10. Démarrage
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
