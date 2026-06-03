import express, { Express, NextFunction, Request, Response } from 'express';
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import router from './routes/index.js';
import cors from "cors"
const app: Express = express();
const port = process.env.PORT || 3000;


const __dirname = path.resolve();
console.log(path.join(__dirname, "storage/public"));

app.use(express.json());

/* Assets publics */
app.use(
  "/assets",
  express.static(path.join(__dirname, "storage/public"))
);

/* Routes */
app.use("/api", router);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


app.use(
  cors({
    origin: "*"
  })
);

// Middleware d'erreur global (4 paramètres)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    // En développement, afficher la stack
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

