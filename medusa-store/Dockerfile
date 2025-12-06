FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# 1. Installation des dépendances (toutes, pour permettre le build)
RUN npm install

COPY . .

# 2. Compilation (Le résultat ira là où Medusa le décide, probablement .medusa/)
RUN npm run build

EXPOSE 9000

# 3. Démarrage
# On lance les migrations DB puis le serveur
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
