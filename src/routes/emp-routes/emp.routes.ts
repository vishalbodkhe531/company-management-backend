import express from "express";
import {
  acceptRequest,
  allRequests,
  loginEmp,
  newEmployee,
} from "../../controllers/employee/employee.controller.js";

const empRoutes = express.Router();

empRoutes.get("/all-requests", allRequests);

empRoutes.post("/new", newEmployee);
empRoutes.post("/login", loginEmp);

empRoutes.put("/accept-requests/:id", acceptRequest);
empRoutes.put("/reject-requests/:id", acceptRequest);

export default empRoutes;
