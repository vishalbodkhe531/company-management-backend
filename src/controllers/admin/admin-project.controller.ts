import { myCache } from "../../app.js";
import { TryCatch } from "../../middlewares/error.middleware.js";
import { Project } from "../../models/admin-model/project.model.js";
import errorHandler from "../../utils/errorHandler.utile.js";
import { invalidateCache } from "../../utils/features.js";

export const newProject = TryCatch(async (req, res, next) => {
  const {
    projectName,
    description,
    startDate,
    endDate,
    budget,
    projectManager,
  } = req.body;

  const isExistProject = await Project.findOne({ projectName });

  if (isExistProject)
    return next(new errorHandler("Project already existed !!", 400));

  if (!projectName || !startDate || !endDate || !budget || !projectManager) {
    return next(new errorHandler("Fill all the fields", 400));
  }

  // Create a new project
  await Project.create({
    projectName,
    description,
    startDate,
    endDate,
    budget,
    projectManager,
    projectStatus: "Planned",
  }).catch((err) => console.log(err));

  invalidateCache({
    project: true,
  });

  res
    .status(200)
    .json({ success: true, message: "Project created successfully" });
});

export const allProjects = TryCatch(async (req, res, next) => {
  const key = `all-projects`;

  let projects = [];

  if (myCache.has(key)) projects = JSON.parse(myCache.get(key) as string);
  else {
    projects = await Project.find({});
    myCache.set(key, JSON.stringify(projects));
  }

  res.status(200).json({ success: true, projects });
});
