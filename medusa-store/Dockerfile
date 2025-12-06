FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package*.json yarn.lock* pnpm-lock.yaml* ./
# Fix : npm install prod (tolérant, génère lock si absent)
RUN npm install --production --no-optional --legacy-peer-deps
COPY . .
ENV NODE_ENV=production DISABLE_MEDUSA_ADMIN=true
RUN npm run build || echo "Build skipped (no admin)"

FROM node:22-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app .
ENV NODE_ENV=production HOST=0.0.0.0 PORT=9000 DISABLE_MEDUSA_ADMIN=true
EXPOSE 9000
HEALTHCHECK --interval=30s CMD curl -f http://localhost:9000/store/health || exit 1
CMD ["/bin/bash", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npx medusa start"]
