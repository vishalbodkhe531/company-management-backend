import { TryCatch } from "../../middlewares/error.middleware.js";

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

  console.log(
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
    role
  );

  res
    .status(201)
    .json({ success: true, message: "Employee created successfully !!" });
});
