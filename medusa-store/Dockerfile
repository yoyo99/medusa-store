# --- Étape de Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (clean)
RUN npm install --omit=dev

# Copie du code source
COPY . .

# Build de l'application (Backend + Admin si configuré)
RUN npm run build

# --- Étape de Production ---
FROM node:20-alpine

WORKDIR /app

# 1. On récupère les modules node installés
COPY --from=builder /app/node_modules ./node_modules

# 2. On récupère les fichiers package
COPY --from=builder /app/package*.json ./

# 3. On récupère le dossier de build (dist)
# NOTE : Si ton projet est en pur JavaScript sans TypeScript, il est possible que 'dist' n'existe pas.
# Dans le doute pour Medusa, on copie le dossier buildé.
COPY --from=builder /app/dist ./dist

# 4. On récupère la configuration Medusa (Essentiel !)
COPY --from=builder /app/medusa-config.js ./

# 5. On récupère le dossier public (pour les uploads locaux ou fichiers statiques)
# L'option "|| true" n'existant pas nativement en COPY Docker simple, 
# on assume que le dossier public existe ou on le crée au cas où pour éviter une erreur
RUN mkdir -p public
COPY --from=builder /app/public ./public

# Expose le port
EXPOSE 9000

# Démarrage : Migrations DB puis Lancement Serveur
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]
