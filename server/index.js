import express from "express";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

const errorHandler=(error,req, res,next)  => {
  console.log(error.message);
  res.status(500).send(`Something went wrong ${error.message}`);
}

app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);

app.use(errorHandler)

app.listen(PORT);
console.log(`server listening on port ${PORT}`);
