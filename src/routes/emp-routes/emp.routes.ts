import express from "express";
import {
  deleteEmp,
  loginEmp,
  logout,
  newEmployee,
  updateEmp,
} from "../../controllers/employee/employee.controller.js";
import {
  acceptRequest,
  allEmployees,
  allRequests,
  departmentDistribution,
  empTrends,
} from "../../controllers/admin/employe.controller.js";
import { isAuthenticat } from "../../middlewares/auth.middleware.js";

const empRoutes = express.Router();

empRoutes.get("/all-requests", allRequests);

empRoutes.post("/new", newEmployee);
empRoutes.post("/login", loginEmp);
empRoutes.get("/logout", isAuthenticat(["employee"]), logout);
empRoutes
  .route("/:id")
  .put(isAuthenticat(["employee"]), updateEmp)
  .delete(isAuthenticat(["employee", "admin"]), deleteEmp);

empRoutes.put("/accept-requests/:id", acceptRequest);
empRoutes.put("/reject-requests/:id", acceptRequest);
empRoutes.get("/all-employee", allEmployees);

// graph routes

empRoutes.get(
  "/department-distribution",
  isAuthenticat(["admin"]),
  departmentDistribution
);

empRoutes.get("/emp-trends", isAuthenticat(["admin"]), empTrends);

export default empRoutes;
