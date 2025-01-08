import express from "express";
import {
  newEmployee,
  sendReqeust,
} from "../../controllers/employee/employee.controller.js";

const empRoutes = express.Router();

empRoutes.post("/new", newEmployee);
empRoutes.post("/send-request", sendReqeust);

export default empRoutes;
