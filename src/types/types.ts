import { NextFunction, Request, Response } from "express";

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
