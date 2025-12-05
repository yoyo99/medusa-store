const plugins = [
  // ... (vos autres plugins existants, s'il y en a)

  {
    resolve: "@medusajs/admin",
    /**
     * @type {import('@medusajs/admin').PluginOptions}
     */
    options: {
      // Le port sur lequel le serveur d'administration sera disponible
      // Par défaut, le port est 7000
      port: 7000,
      // L'URL d'origine de l'interface d'administration
      // C'est important pour les requêtes CORS.
      // Cela peut être `process.env.ADMIN_CORS` ou une URL spécifique comme "https://admin.medusa.jobnexai.com"
      // Laissez vide si vous n'avez pas de frontend admin séparé pour le moment ou si Coolify gère le CORS.
      // admin_url: process.env.ADMIN_CORS,
      
      // Activer ou désactiver la reconstruction automatique de l'interface d'administration.
      // Utile en développement. En production, l'admin est souvent déployé séparément.
      autoRebuild: process.env.NODE_ENV !== "production",
      
      // Si vous voulez désactiver complètement la construction de l'admin par le backend Medusa :
      // disable: process.env.DISABLE_MEDUSA_ADMIN === "true", 
    },
  },
];

module.exports = {
  projectConfig: {
    redis: {
      url: process.env.REDIS_URL,
    },
    database: {
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      // ssl: { rejectUnauthorized: false }, // Décommentez si votre PostgreSQL Coolify nécessite le SSL
    },
    store_cors: process.env.STORE_CORS || "http://localhost:8000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7000",
  },
  plugins,
};
