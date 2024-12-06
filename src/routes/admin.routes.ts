import express from "express";
import { createAdmin } from "../controllers/admin.controller.js";
// import { createAdmin } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/new", createAdmin);

export default adminRoutes;
