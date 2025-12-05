# --- Étape 1 : Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# CORRECTION 1 : On installe TOUT (y compris les devDependencies)
# C'est nécessaire pour que 'npm run build' ait accès à ts-node/typescript
RUN npm install

COPY . .

# Compilation du projet
RUN npm run build

# --- Étape 2 : Production ---
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# CORRECTION 2 : On réinstalle proprement uniquement les dépendances de prod
# Cela garantit une image légère et fonctionnelle
RUN npm install --omit=dev

# Copie des fichiers compilés (le dossier dist)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/medusa-config.js ./

# CORRECTION 3 : On crée juste le dossier public vide au lieu de le copier
# Cela évite l'erreur "not found" si le dossier n'existe pas côté builder
RUN mkdir -p public

EXPOSE 9000

# Démarrage
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]

