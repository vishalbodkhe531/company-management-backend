import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getLoginAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { isAuthenticat } from "../middlewares/auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.post("/new", createAdmin);
adminRoutes.post("/login", loginAdmin);

adminRoutes.route("/:id").delete(deleteAdmin);

adminRoutes.get("/", isAuthenticat, getLoginAdmin);

export default adminRoutes;
