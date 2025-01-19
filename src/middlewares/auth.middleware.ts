import { Admin } from "../models/admin-model/admin.model.js";
import errorHandler from "../utils/errorHandler.utile.js";
import { TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/emp-model/employee.model.js";

interface JwtPayloadWithId extends jwt.JwtPayload {
  _id: string;
}

export const isAuthenticat = (allowedRoles: string[]) =>
  TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { cookie } = req.cookies;

    if (!cookie) return next(new errorHandler("You should login first", 401));

    const verify = jwt.verify(
      cookie,
      process.env.SECRET_KEY as string
    ) as JwtPayloadWithId;

    if (!verify._id) {
      return next(new errorHandler("Invalid token payload", 401));
    }

    let user = null;
    let role = null;

    user = await Admin.findById(verify._id);
    if (user) role = "admin";

    if (!user) {
      user = await Employee.findById(verify._id);
      if (user) role = "employee";
    }

    // Check in Client schema
    // if (!user) {
    //   user = await Client.findById(verify._id);
    //   if (user) role = "client";
    // }

    if (!user || !role) {
      return next(new errorHandler("User not found", 404));
    }

    req.user = user;
    req.userRole = role;
    next();
  });
