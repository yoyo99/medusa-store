import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // 👇 On ajoute Redis pour éviter l'avertissement et stabiliser le tout
    redisUrl: process.env.REDIS_URL,
    
    // 👇 La correction pour le SSL de la base de données
    databaseDriverOptions: {
      connection: {
        ssl: false
      }
    },
    
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      
      // 👇 On remet ça pour forcer l'écoute publique (INDISPENSABLE pour Coolify)
      // @ts-ignore
      host: process.env.HOST || "0.0.0.0",
      // @ts-ignore
      port: process.env.PORT ? parseInt(process.env.PORT) : 9000
    }
  }
})
