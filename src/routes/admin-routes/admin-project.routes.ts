import express from "express";
import {
  allProjects,
  newProject,
} from "../../controllers/admin/admin-project.controller.js";

const projectRoutes = express.Router();

projectRoutes.post("/new", newProject);
projectRoutes.get("/all", allProjects);

export default projectRoutes;
