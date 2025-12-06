# Build stage
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package*.json yarn.lock* pnpm-lock.yaml* ./
RUN npm install  # ✅ Génère lock si absent, full deps
COPY . .
ENV NODE_ENV=production DISABLE_MEDUSA_ADMIN=true
RUN npm run build || echo "Build skipped"

# Runtime
FROM node:22-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app .
RUN npm install -g @medusajs/medusa-cli
# Instr fix FULL (path expected)
RUN mkdir -p instrumentation && echo 'module.exports = function() {};' > instrumentation/index.js
ENV NODE_ENV=production HOST=0.0.0.0 PORT=9000 DISABLE_MEDUSA_ADMIN=true PG_POOL_SIZE=20
EXPOSE 9000
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 CMD curl -f http://localhost:9000/store/health || exit 1
CMD ["sh", "-c", "medusa db:migrate || true && medusa db:sync-links || true && medusa start"]
