// import { Admin } from "../models/admin-model/admin.model.js";
// import errorHandler from "../utils/errorHandler.utile.js";
// import { TryCatch } from "./error.middleware.js";
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import { Employee } from "../models/emp-model/employee.model.js";

// interface JwtPayloadWithId extends jwt.JwtPayload {
//   _id: string;
// }

// export const isAuthenticat = (allowedRoles: string[]) =>
//   TryCatch(async (req: Request, res: Response, next: NextFunction) => {
//     const { cookie } = req.cookies;

//     console.log(cookie);

//     if (!cookie) return next(new errorHandler("You should login first", 401));

//     const verify = jwt.verify(
//       cookie,
//       process.env.SECRET_KEY as string
//     ) as JwtPayloadWithId;

//     if (!verify._id) {
//       return next(new errorHandler("Invalid token payload", 401));
//     }

//     let user = null;
//     let role = null;

//     user = await Admin.findById(verify._id);
//     if (user) role = "admin";

//     if (!user) {
//       user = await Employee.findById(verify._id);
//       if (user) role = "employee";
//     }

//     // Check in Client schema
//     // if (!user) {
//     //   user = await Client.findById(verify._id);
//     //   if (user) role = "client";
//     // }

//     if (!user || !role) {
//       return next(new errorHandler("User not found", 404));
//     }

//     req.user = user;
//     req.userRole = role;
//     next();
//   });

// import { Admin } from "../models/admin-model/admin.model.js";
// import errorHandler from "../utils/errorHandler.utile.js";
// import { TryCatch } from "./error.middleware.js";
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import { Employee } from "../models/emp-model/employee.model.js";

// interface JwtPayloadWithId extends jwt.JwtPayload {
//   _id: string;
// }

// export const isAuthenticat = (allowedRoles: string[]) =>
//   TryCatch(async (req: Request, res: Response, next: NextFunction) => {
//     const { AdminCookie, EmpCookie } = req.cookies;

//     // console.log(cookie);

//     if (!AdminCookie || EmpCookie)
//       return next(new errorHandler("You should login first", 401));

//     const verify = jwt.verify(
//       AdminCookie || EmpCookie,
//       process.env.SECRET_KEY as string
//     ) as JwtPayloadWithId;

//     if (!verify._id) {
//       return next(new errorHandler("Invalid token payload", 401));
//     }

//     let user = null;
//     let role = null;

//     user = await Admin.findById(verify._id);
//     if (user) role = "admin";

//     if (!user) {
//       user = await Employee.findById(verify._id);
//       if (user) role = "employee";
//     }

//     // Check in Client schema
//     // if (!user) {
//     //   user = await Client.findById(verify._id);
//     //   if (user) role = "client";
//     // }

//     if (!user || !role) {
//       return next(new errorHandler("User not found", 404));
//     }

//     req.user = user;
//     req.userRole = role;
//     next();
//   });

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
    const { admin, employee, client } = req.cookies;

    if (!admin && !employee) {
      console.log(`first1`);
      return next(new errorHandler("You should login first", 401));
    }

    const token = admin || employee || client;

    const verify = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayloadWithId;

    if (!verify._id) {
      return next(new errorHandler("Invalid token payload", 401));
    }

    let user = null;
    let role = null;

    if (admin) {
      user = await Admin.findById(verify._id);
      if (user) role = "admin";
    }

    if (!user && employee) {
      user = await Employee.findById(verify._id);
      if (user) role = "employee";
    }

    console.log(`first2`);
    // Check for client
    // if (!user && client) {
    //   user = await Client.findById(verify._id);
    //   if (user) role = "client";
    // }

    if (!user || !role) {
      return next(new errorHandler("User not found", 404));
    }

    console.log(`first3`);

    if (!allowedRoles.includes(role)) {
      return next(
        new errorHandler("Access denied: Insufficient permissions", 403)
      );
    }

    console.log("user : ", user);

    req.user = user;
    req.userRole = role;
    next();
  });
