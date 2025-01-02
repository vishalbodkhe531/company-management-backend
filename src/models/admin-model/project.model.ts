import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, default: "No description provided" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  projectManager: {
    type: String,
    required: true,
  },
  projectStatus: {
    type: String,
    default: "Planned",
    enum: ["Planned", "In Progress", "Completed"],
  },
});

export const Project = mongoose.model("Project", projectSchema);
