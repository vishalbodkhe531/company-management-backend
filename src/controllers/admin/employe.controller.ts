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

export const departmentDistribution = TryCatch(async (req, res, next) => {
  const allSkills = await Employee.aggregate([
    { $group: { _id: "$skill", count: { $sum: 1 } } },
  ]);

  res.status(200).json({ allSkills });
});

export const empTrends = TryCatch(async (req, res, next) => {
  const employeeTrend = await Employee.aggregate([
    {
      $group: {
        _id: { $month: "$resignationDate" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = new Array(12).fill(0);

  employeeTrend.forEach(({ _id, count }) => {
    data[_id - 1] = count;
  });

  res.status(200).json({
    labels,
    datasets: [
      {
        data,
      },
    ],
  });
});
