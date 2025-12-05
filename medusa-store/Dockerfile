# --- Étape 1 : Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# CORRECTION : On installe TOUT (y compris les devDependencies)
RUN npm install

COPY . .

# Compilation du projet
RUN npm run build

# --- Étape 2 : Production ---
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# CORRECTION : On réinstalle proprement uniquement les dépendances de prod
RUN npm install --omit=dev

# Copie des fichiers compilés (le dossier dist)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/medusa-config.js ./

# CORRECTION : On crée juste le dossier public vide au lieu de le copier
RUN mkdir -p public

EXPOSE 9000

# Démarrage
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]
