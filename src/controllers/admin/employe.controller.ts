import { TryCatch } from "../../middlewares/error.middleware.js";
import { Employee } from "../../models/emp-model/employee.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";
import jwt from "jsonwebtoken";

export const allRequests = TryCatch(async (req, res, next) => {
  const allRequests = await Employee.find({ isVerified: "pendding" });
  res.status(200).json({ success: true, allRequests });
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

export const allEmployees = TryCatch(async (req, res, next) => {
  const employees = await Employee.find({ isVerified: "accepted" });
  res.status(200).json({ allRequests: employees });
});
