# --- Étape de Build (pour installer les dépendances et builder l'application) ---
FROM node:20-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
# Utiliser --omit=dev si vous ne voulez pas les devDependencies en production
RUN npm install --omit=dev

# Copier le reste du code de l'application
COPY . .

# Exécuter la commande de build de Medusa
# Cela va compiler le backend et l'admin UI (si configuré)
RUN npm run build

# --- Étape de Production (pour exécuter l'application) ---
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires de l'étape de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist  # Le code compilé
COPY --from=builder /app/src ./src    # Si vous avez des fichiers non compilés nécessaires
COPY --from=builder /app/medusa-config.js ./
COPY --from=builder /app/medusa-entry.js ./ # Si vous utilisez un point d'entrée personnalisé
COPY --from=builder /app/.env.example ./.env.example # Si vous avez un exemple d'env

# Copier les fichiers spécifiques aux plugins (ex: medusa-config.js)
# Vous devrez peut-être ajuster ces lignes si vous avez des fichiers de configuration personnalisés
# pour vos plugins dans le dossier racine ou d'autres sous-dossiers
COPY --from=builder /app/medusa-config.js ./medusa-config.js
# ... ajoutez d'autres fichiers de configuration spécifiques si nécessaire (e.g. pour un plugin)

# Exposer le port de Medusa (par défaut 9000)
EXPOSE 9000

# Commande de démarrage
# Les migrations doivent être exécutées avant de démarrer le serveur
# `npx medusa db:migrate` va utiliser les variables d'environnement injectées par Coolify
# `npm run start` (qui exécute `medusa start`) démarrera le serveur
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]
