import { TryCatch } from "../../middlewares/error.middleware.js";
import { Employee } from "../../models/emp-model/employee.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";
import jwt from "jsonwebtoken";

export const newEmployee = TryCatch(async (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    resignationDate,
    qualification,
    skill,
    address,
    profilePic,
    gender,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !email ||
    !resignationDate ||
    !qualification ||
    !skill ||
    !address ||
    !gender
  )
    return next(new errorHandler("Fill all the fields !!", 400));

  const isExistEmail = await Employee.findOne({ email });

  if (isExistEmail)
    return next(new errorHandler("Email already exist !!", 400));

  await Employee.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    resignationDate,
    qualification,
    skill,
    address,
    profilePic,
    gender,
    role,
  });

  res
    .status(200)
    .json({ success: true, message: "Request Sended successfully !!" });
});

export const loginEmp = TryCatch(async (req, res, next) => {
  const { email, skill, gender } = req.body;

  const isExistEmail = await Employee.findOne({ email });

  if (!isExistEmail) return next(new errorHandler("Email not exist !!", 400));

  if (isExistEmail.isVerified === "pendding")
    return next(
      new errorHandler(
        "You are not logged in.. Contact the admin to approve your request!!!",
        400
      )
    );

  if (isExistEmail.gender !== gender)
    return next(new errorHandler("Select correct gender", 400));

  if (isExistEmail.skill !== skill)
    return next(new errorHandler("Select correct department", 400));

  const token = jwt.sign(
    { _id: isExistEmail._id },
    process.env.SECRET_KEY as string
  );

  res
    .cookie("cookie", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ isExistEmail });
});

export const updateEmp = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    return next(new errorHandler("Nothing any change !!", 400));
  }

  if (req.body.email) {
    const isExistEmail = await Employee.find({ email: req.body.email });
    if (isExistEmail)
      return next(new errorHandler("Email already exist !!", 400));
  }

  const newEmp = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        qualification: req.body.qualification,
        skill: req.body.skill,
        address: req.body.address,
        profilePic: req.body.profilePic,
        gender: req.body.gender,
      },
    },
    { new: true }
  );

  res.status(201).json(newEmp);
});

export const logout = TryCatch(async (req, res, next) => {
  res
    .clearCookie("cookie")
    .status(200)
    .json({ success: true, message: "Logout Successfully" });
});
