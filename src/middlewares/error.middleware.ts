import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import errorHandler from "../utils/errorHandler.utile.js";
import { controllerType } from "../types/types.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: errorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof errorHandler) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export const TryCatch =
  (func: controllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
