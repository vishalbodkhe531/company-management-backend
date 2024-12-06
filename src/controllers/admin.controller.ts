import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.middleware.js";
import errorHandler from "../utils/errorHandler.utile.js";

export const createAdmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, message: "successFully done" });
  }
);
