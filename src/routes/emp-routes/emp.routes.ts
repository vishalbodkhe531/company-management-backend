import express from "express";
import { newEmployee } from "../../controllers/employee/employee.controller.js";

const empRoutes = express.Router();

empRoutes.post("/new", newEmployee);

export default empRoutes;
