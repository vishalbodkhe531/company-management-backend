import express from "express";
import {
  createAdmin,
  deleteAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/new", createAdmin);
adminRoutes.post("/login", loginAdmin);

adminRoutes.route("/:id").delete(adminRoutes);

export default adminRoutes;
