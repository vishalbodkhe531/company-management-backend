import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

export type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface newAdminRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  gender?: string;
}
