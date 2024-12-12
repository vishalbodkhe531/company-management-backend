import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getLoginAdmin,
  loginAdmin,
  updateAdmin,
} from "../controllers/admin.controller.js";
import { isAuthenticat } from "../middlewares/auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/logged", isAuthenticat, getLoginAdmin);

adminRoutes.post("/new", createAdmin);
adminRoutes.post("/login", loginAdmin);

adminRoutes.route("/:id").delete(deleteAdmin).put(isAuthenticat, updateAdmin);

export default adminRoutes;
