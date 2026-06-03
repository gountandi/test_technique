import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import router from "./routes/index.js";

const app: Express = express();
const port = process.env.PORT || 3000;

// 1. CORS en premier (pour toute l'application)
app.use(
  cors({
    origin: "*", // à restreindre en production si nécessaire
  })
);

// 2. Parsing du JSON
app.use(express.json());

// 3. Assets statiques
// ⚠️ Vérifie que le dossier "storage/public" existe dans ton projet
const publicPath = path.join(process.cwd(), "storage", "public");
app.use("/assets", express.static(publicPath));

// 4. Interface Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 5. Routes API
app.use("/api", router);

// 6. Gestion d'erreur centralisée (un seul middleware suffit)
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // Log complet de l'erreur (visible dans les logs Render)
  console.error("Error caught:", err.stack || err);

  // Déterminer le code HTTP : si l'erreur a un statut explicite, on le prend, sinon 500
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Erreur interne du serveur",
    // En dehors de la production, on peut exposer la stack pour déboguer
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// 7. Démarrage
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;