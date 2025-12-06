# Multi-stage : Builder (deps + build) → Runtime (light)
FROM node:22-slim AS builder

WORKDIR /app

# Outils pour npm install (sharp/node-gyp)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Prod deps only (fast, no devDeps)
COPY package*.json yarn.lock* ./
RUN npm ci --omit=dev

# Code source + Build (skip admin pour éviter crash CLI Node22)
COPY . .
ENV NODE_ENV=production \
    DISABLE_MEDUSA_ADMIN=true  # ← TRUE : Skip admin build (fix TypeError 'disable')
RUN npm run build

# Runtime : Ultra-léger
FROM node:22-slim

WORKDIR /app

# Curl pour Coolify healthcheck (/store/health)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copie prod-ready
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.medusa ./  # Output Medusa standard
COPY --from=builder /app/medusa-config.js ./medusa-config.js  # Si existe

# Env
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=9000 \
    DISABLE_MEDUSA_ADMIN=true  # Backend only (réactive false après)

EXPOSE 9000

# Démarrage : DB first !
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npx medusa start"]
