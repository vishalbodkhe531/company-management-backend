import { TryCatch } from "../../middlewares/error.middleware.js";
import { Employee } from "../../models/emp-model/employee.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";

export const newEmployee = TryCatch(async (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    resignationDate,
    qualification,
    department,
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
    !department ||
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
    department,
    address,
    profilePic,
    gender,
    role,
  });

  res
    .status(200)
    .json({ success: true, message: "Request Sended successfully !!" });
});

export const allRequests = TryCatch(async (req, res, next) => {
  const allRequests = await Employee.find();
  res.status(200).json({ success: true, allRequests });
});

export const loginEmp = TryCatch(async (req, res, next) => {
  const { email, department, gender } = req.body;

  const isExistEmail = await Employee.findOne({ email });

  if (!isExistEmail) return next(new errorHandler("Email not exist !!", 400));

  if (
    isExistEmail.isVerified === "pendding"
    // isExistEmail.isVerified === "rejected"
  )
    return next(
      new errorHandler(
        "You are not logged in.. Contact the admin to approve your request!!!",
        400
      )
    );

  if (isExistEmail.gender !== gender)
    return next(new errorHandler("Select correct gender", 400));

  if (isExistEmail.department !== department)
    return next(new errorHandler("Select correct department", 400));

  res.status(200).json({ success: true, message: "Login successfully !!" });
});

export const acceptRequest = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const isExist = await Employee.findById({ _id: id });

  if (!isExist) return next(new errorHandler("email not exist !!", 400));

  const newEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        isVerified: "accepted",
      },
    },
    { new: true }
  );

  res.status(200).json({ success: true, newEmployee });
});

export const rejectRequest = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const isExist = await Employee.findById({ _id: id });

  if (!isExist) return next(new errorHandler("email not exist !!", 400));

  const newEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        isVerified: "rejected",
      },
    },
    { new: true }
  );

  res.status(200).json({ success: true, newEmployee });
});
