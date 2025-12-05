FROM node:22-slim

WORKDIR /app

# CORRECTION 1 : On ajoute 'wget' à côté de 'curl'
RUN apt-get update && apt-get install -y python3 make g++ curl wget && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# CORRECTION 2 : On force le build de l'admin Medusa explicitement
# Si 'npm run build' ne fait que le backend, cette commande construira l'admin
RUN npm run build && npx medusa build

EXPOSE 9000

ENV HOST=0.0.0.0
ENV PORT=9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
