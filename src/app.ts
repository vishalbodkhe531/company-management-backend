import express, { NextFunction, Request, Response } from "express";
import adminRoutes from "./routes/admin.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
});

app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

app.listen(4000, () => {
  console.log(`Server is working on http://localhost:4000`);
});
