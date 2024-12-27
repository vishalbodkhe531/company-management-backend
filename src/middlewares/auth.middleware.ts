import { Admin } from "../models/admin-model/admin.model.js";
import errorHandler from "../utils/errorHandler.utile.js";
import { TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayloadWithId extends jwt.JwtPayload {
  _id: string;
}

export const isAuthenticat = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cookie } = req.cookies;

    if (!cookie) return next(new errorHandler("You should login first", 401));

    const verify = jwt.verify(
      cookie,
      process.env.SECRET_KEY as string
    ) as JwtPayloadWithId;

    if (!verify._id) {
      return next(new errorHandler("Invalid token payload", 401));
    }

    req.user = await Admin.findById({ _id: verify._id });
    next();
  }
);
