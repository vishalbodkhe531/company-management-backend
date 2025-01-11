import express from "express";
import {
  acceptRequest,
  allRequests,
  newEmployee,
  // sendReqeust,
} from "../../controllers/employee/employee.controller.js";

const empRoutes = express.Router();

empRoutes.post("/new", newEmployee);
// empRoutes.post("/send-request", sendReqeust);
// empRoutes.post("/send-request", sendReqeust);
empRoutes.get("/all-requests", allRequests);
empRoutes.put("/accept-requests/:id", acceptRequest);

export default empRoutes;
