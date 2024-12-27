import express from "express";
import {
  deleteAdmin,
  getLoginAdmin,
  updateAdmin,
} from "../../controllers/admin/admin.controller.js";
import { isAuthenticat } from "../../middlewares/auth.middleware.js";
import { newProject } from "../../controllers/admin/admin-project.controller.js";

const projectRoutes = express.Router();

projectRoutes.post("/new", isAuthenticat, newProject);
projectRoutes.route("/:id").delete(deleteAdmin).put(isAuthenticat, updateAdmin);

export default projectRoutes;
