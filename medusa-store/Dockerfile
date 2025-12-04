FROM node:22-slim

WORKDIR /app

# J'ai ajouté 'curl' ici 👇
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

ENV HOST=0.0.0.0
ENV PORT=9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
