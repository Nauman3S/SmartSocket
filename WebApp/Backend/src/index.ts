import { blue, bold, yellow } from "colors";
import express, { Express, Request, Response } from "express";
import config from "./config";
import database from "./database";
import middlewares from "./middlewares";
import apiRoutes from "./routes/routes";
import path from "path";

const app: Express = express();
const PORT: number = parseInt(config.PORT as string, 10);

//Initializing Middlewares
middlewares(app);

//Database Connection
database();

//Frontend Build Route
app.use("/", express.static(path.join(__dirname, "../../Frontend/build")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../../Frontend/build/index.html"));
});

//Initialize Routes
app.use("/api", apiRoutes);

//Listening to PORT
app.listen(PORT, (): void =>
  console.log(`${blue("Server Running On PORT: ")} ${bold(
    blue(`${config.PORT}`)
  )}
${yellow("API URL: ")} ${blue(`http://localhost:${config.PORT}/api`)}`)
);
