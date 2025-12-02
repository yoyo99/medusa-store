import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      // 👇 C'EST ICI QUE LA MAGIE OPÈRE :
      // On dit à Medusa d'utiliser les variables qu'on a mises dans Coolify
      host: process.env.HOST || "0.0.0.0",
      port: process.env.PORT ? parseInt(process.env.PORT) : 9000
    }
  }
})
