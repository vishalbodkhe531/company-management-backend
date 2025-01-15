import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { dbConnection } from "./db/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/admin-routes/admin-project.routes.js";
import adminRoutes from "./routes/admin-routes/admin.routes.js";
import { isAuthenticat } from "./middlewares/auth.middleware.js";
import NodeCache from "node-cache";
import empRoutes from "./routes/emp-routes/emp.routes.js";
import getRole from "./routes/admin-routes/getLoggedUser.routes.js";

config({ path: "./.env" });

dbConnection();

export const myCache = new NodeCache(); //it data store in RAM memory (primary storage)

const app = express();

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
});

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/project", isAuthenticat(["admin"]), projectRoutes);
app.use("/api/get-logged-user", getRole);

// Employee Routes
app.use("/api/emp", empRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
