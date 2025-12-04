FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# AJOUTE CETTE LIGNE - Build du backend + admin dashboard
RUN npm run build

EXPOSE 9000

ENV HOST=0.0.0.0
ENV PORT=9000

# Simplifie le CMD - le build est déjà fait
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
