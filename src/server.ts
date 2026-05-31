import express, { Express, NextFunction, Request, Response } from 'express';
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import router from './routes';

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



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/* Routes */
app.use("/api", router);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);