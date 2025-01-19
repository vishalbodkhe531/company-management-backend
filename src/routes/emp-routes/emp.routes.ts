import express from "express";
import {
  loginEmp,
  newEmployee,
  updateEmp,
} from "../../controllers/employee/employee.controller.js";
import {
  acceptRequest,
  allEmployees,
  allRequests,
} from "../../controllers/admin/employe.controller.js";

const empRoutes = express.Router();

empRoutes.get("/all-requests", allRequests);

empRoutes.post("/new", newEmployee);
empRoutes.post("/login", loginEmp);
empRoutes.route("/:id").put(updateEmp);

empRoutes.put("/accept-requests/:id", acceptRequest);
empRoutes.put("/reject-requests/:id", acceptRequest);
empRoutes.get("/all-employee", allEmployees);

export default empRoutes;
