FROM node:22-slim

# Déclaration des ARG dès le début
ARG ADMIN_CORS
ARG AUTH_CORS
ARG COOKIE_SECRET
ARG DATABASE_URL
ARG DISABLE_MEDUSA_ADMIN
ARG HOST
ARG JWT_SECRET
ARG MEDUSA_ADMIN_ONBOARDING_TYPE
ARG MEDUSA_BACKEND_URL
ARG MEDUSA_WORKER_MODE
ARG PORT
ARG REDIS_PASSWORD
ARG REDIS_URL
ARG STORE_CORS

# Conversion ARG → ENV pour qu'elles soient disponibles pendant RUN
ENV ADMIN_CORS=$ADMIN_CORS \
    AUTH_CORS=$AUTH_CORS \
    COOKIE_SECRET=$COOKIE_SECRET \
    DATABASE_URL=$DATABASE_URL \
    DISABLE_MEDUSA_ADMIN=$DISABLE_MEDUSA_ADMIN \
    HOST=$HOST \
    JWT_SECRET=$JWT_SECRET \
    MEDUSA_ADMIN_ONBOARDING_TYPE=$MEDUSA_ADMIN_ONBOARDING_TYPE \
    MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL \
    MEDUSA_WORKER_MODE=$MEDUSA_WORKER_MODE \
    PORT=$PORT \
    REDIS_PASSWORD=$REDIS_PASSWORD \
    REDIS_URL=$REDIS_URL \
    STORE_CORS=$STORE_CORS

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ curl wget && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Maintenant les ENV sont disponibles pour le build
RUN npm run build && npx medusa build

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa db:sync-links && npm run start"]
