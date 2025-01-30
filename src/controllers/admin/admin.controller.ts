import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../../middlewares/error.middleware.js";
import { Admin } from "../../models/admin-model/admin.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utils/mailar.js";
import OTP from "../../models/admin-model/OTP.model.js";

export const createAdmin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, profilePic, gender } = req.body;

    if (!email || !name || !password)
      return next(new errorHandler("All fields are required", 400));

    const isExistEmail = await Admin.findOne({ email });
    if (isExistEmail)
      return next(new errorHandler("Email already exists", 400));

    const securePass = bcryptjs.hashSync(password, 10);

    await Admin.create({
      name,
      email,
      password: securePass,
      profilePic,
      gender,
    });

    res
      .status(201)
      .json({ success: true, message: "Admin successfully created!" });
  }
);

export const sendOTP = TryCatch(async (req, res, next) => {
  const { email } = req.body;

  const verificationOTP = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //OTP valid for 5 minutes

  const sendOTPMail = await sendMail(
    process.env.EMAIL_USER as string,
    email,
    "Verify Your Email",
    `Your verification OTP is: ${verificationOTP}`
  );

  if (!sendOTPMail)
    return next(new errorHandler("Failed to send verification email", 500));

  const isExistOTP = await OTP.findOne({ email });

  if (isExistOTP) {
    await OTP.findOneAndUpdate(
      { email },
      { $set: { email, verificationCode: verificationOTP, expiresAt } },
      { new: true }
    );
  }

  await OTP.create({ email, verificationCode: verificationOTP, expiresAt });

  res.status(200).json({ success: true, message: "OTP sent successfully" });
});

export const verificationOTP = TryCatch(async (req, res, next) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    res.status(400).json({ message: "Email and OTP are required." });
  }

  const record = await OTP.findOne({ email });

  if (!record) return next(new errorHandler("Invalid OTP !!", 400));

  if (new Date() > record.expiresAt)
    return next(new errorHandler("OTP has expired !!", 400));

  if (record.verificationCode !== verificationCode)
    return next(new errorHandler("Incorrect OTP", 400));

  await OTP.deleteOne({ email });

  res
    .status(200)
    .json({ success: true, message: "OTP verified successfully." });
});

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
      .cookie("admin", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(202)
      .json({ success: true, admin: isExistAdmin });
  }
);

export const deleteAdmin = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isAdminExist = await Admin.findByIdAndDelete(id);

  if (!isAdminExist) return next(new errorHandler("Email not found !!", 404));

  res
    .status(200)
    .json({ success: true, message: "Admin successfully Deleted" });
});

export const getLoginAdmin = TryCatch(async (req, res, next) => {
  const { user } = req;
  if (!user) return next(new errorHandler("You should login first", 401));
  res.status(200).json({ success: true, admin: user });
});

export const logoutAdmin = TryCatch(async (req, res, next) => {
  res
    .clearCookie("admin")
    .status(200)
    .json({ success: true, message: "Logout Successfully" });
});

export const updateAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  let { name, email, password, gender } = req.body;

  const admin = await Admin.findById(id);

  if (!admin) return next(new errorHandler("Admin not found", 404));

  if (password) {
    password = bcryptjs.hashSync(req.body.password, 10);
  }

  admin.name = name || admin.name;
  admin.email = email || admin.email;
  admin.password = password || admin.password;
  admin.gender = gender || admin.gender;

  const updatedAdmin = await admin.save();

  res.status(200).json({
    success: true,
    message: "Admin profile updated successfully",
    data: updatedAdmin,
  });
});

export const googleLogin = TryCatch(async (req, res, next) => {
  const { name, email, profilePic, gender } = req.body;

  const isExisted = await Admin.findOne({ email });

  if (isExisted) {
    const token = jwt.sign(
      { _id: isExisted._id },
      process.env.SECRET_KEY as string
    );

    const { password, ...userData } = isExisted.toObject();

    res
      .cookie("admin", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(userData);
    return;
  }

  const password = Math.floor(Math.random() * 10000000 + 10000000).toString();

  const hashPass = bcryptjs.hashSync(password, 10);

  const newUser = new Admin({
    name,
    email,
    password: hashPass,
    profilePic,
    gender,
  });

  await newUser.save();

  console.log("newUser : ");

  const { password: xyz, ...userData } = newUser.toObject();

  const token = jwt.sign(
    { _id: newUser._id },
    process.env.SECRET_KEY as string
  );
  res
    .cookie("admin", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(userData);
});

export const getLoggedUser = TryCatch(async (req, res, next) => {
  const { user } = req;
  if (!user) return next(new errorHandler("You should login first", 401));
  res.status(200).json({ success: true, user: user });
});
