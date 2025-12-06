# Multi-stage : Builder (deps + build) → Runtime (light)
FROM node:22-slim AS builder

WORKDIR /app

# Outils npm (sharp/node-gyp)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Prod deps (no devDeps)
COPY package*.json yarn.lock* ./
RUN npm ci --omit=dev

# Build (admin skipped)
COPY . .
ENV NODE_ENV=production DISABLE_MEDUSA_ADMIN=true
RUN npm run build

# Runtime light
FROM node:22-slim

WORKDIR /app

# Curl healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copie
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.medusa ./ || true
COPY --from=builder /app/medusa-config.js ./ || true

# Env runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=9000 DISABLE_MEDUSA_ADMIN=true

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:9000/store/health || exit 1

# DB first
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npx medusa start"]
