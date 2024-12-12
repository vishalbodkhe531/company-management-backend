import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { dbConnection } from "./db/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config({ path: "./.env" });

dbConnection();

const app = express();

app.use(express.json());

// app.use(cors());
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

app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
