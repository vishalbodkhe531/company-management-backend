import { TryCatch } from "../../middlewares/error.middleware.js";
import { Employee } from "../../models/emp-model/employee.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";

export const sendReqeust = TryCatch(async (req, res, next) => {
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
    isVerified,
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
    return next(
      new errorHandler("Email already exist Wait for accept request!!", 400)
    );

  !(await Employee.create({
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
    isVerified,
    role,
  }));

  res
    .status(200)
    .json({ success: true, message: "Request Sended successfully !!" });
});

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
    isVerified,
    role,
  } = req.body;

  const isExistEmp = await Employee.findOne({ email });

  if (isExistEmp) return next(new errorHandler("email already exist !!", 400));

  res
    .status(201)
    .json({ success: true, message: "Employee created successfully !!" });
});
