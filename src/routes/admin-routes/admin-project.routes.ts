import express from "express";
import {
  allProjects,
  deleteProject,
  newProject,
  updateProject,
} from "../../controllers/admin/admin-project.controller.js";

const projectRoutes = express.Router();

projectRoutes.post("/new", newProject);
projectRoutes.get("/all", allProjects);

projectRoutes.route("/:id").delete(deleteProject).put(updateProject);

export default projectRoutes;
