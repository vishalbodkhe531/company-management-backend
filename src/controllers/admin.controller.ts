import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.middleware.js";
import { Admin } from "../models/admin.model.js";
import errorHandler from "../utils/errorHandler.utile.js";
import jwt from "jsonwebtoken";

export const createAdmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, profilePic, gender } = req.body;

    if (!email || !name || !password)
      return next(new errorHandler("Fill the all fileds", 400));

    const isExistEmail = await Admin.findOne({ email });

    if (isExistEmail)
      return next(new errorHandler("Email already exist !!", 400));

    const securePass = bcryptjs.hashSync(password, 10);

    console.log(gender);

    await Admin.create({
      name,
      email,
      password: securePass,
      profilePic,
      gender,
    });

    res
      .status(200)
      .json({ success: true, message: "Admin successfully created !!" });
  }
);

export const loginAdmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new errorHandler("Fill all the fields", 400));

    const isExistAdmin = await Admin.findOne({ email });

    if (!isExistAdmin) return next(new errorHandler("Email not found !!", 404));

    const matchPass = bcryptjs.compareSync(password, isExistAdmin.password);

    if (!matchPass) return next(new errorHandler("Incorrect Password", 400));

    const token = jwt.sign(
      { _id: isExistAdmin._id },
      process.env.SECRET_KEY as string
    );

    res
      .cookie("cookie", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 15 * 60 * 60 * 1000,
      })
      .status(202)
      .json({ success: true, admin: isExistAdmin });
  }
);

export const deleteAdmin = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isAdminExist = await Admin.findByIdAndDelete(id);

  console.log(isAdminExist);

  if (!isAdminExist) return next(new errorHandler("Email not found !!", 404));

  res
    .status(200)
    .json({ success: true, message: "Admin successfully Deleted" });
});

export const getLoginAdmin = TryCatch(async (req, res, next) => {
  const { user } = req;
  if (!user) return next(new errorHandler("You should login first", 401));
  res.status(200).json({ success: true, user });
});
