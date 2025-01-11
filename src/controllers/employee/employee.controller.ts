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
    isVerified,
    role,
  });

  res
    .status(200)
    .json({ success: true, message: "Request Sended successfully !!" });
});

export const acceptRequest = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  const isExist = await Employee.findById({ _id: id });

  if (!isExist) return next(new errorHandler("email not exist !!", 400));

  const newEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        isVerified: true,
      },
    },
    { new: true }
  );

  res.status(200).json({ success: true, newEmployee });
});

export const allRequests = TryCatch(async (req, res, next) => {
  const allRequests = await Employee.find();
  res.status(200).json({ success: true, allRequests });
});
