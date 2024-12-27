// import { Schema, model, Document } from "mongoose";

// interface ProjectDocument extends Document {
//   name: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
//   budget: Number;
//   projectManager: string;
//   status: string;
// }

// const projectSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     description: String,
//     startDate: {
//       type: Date,
//       required: true,
//     },
//     endDate: {
//       type: Date,
//       required: true,
//     },
//     budget: {
//       type: Number,
//       required: true,
//     },
//     projectManager: { type: String, required: true },
//     status: {
//       type: String,
//       default: "Planned",
//       enum: ["Planned", "In Progress", "Completed"],
//     },
//   },
//   { timestamps: true }
// );

// export const Project = model<ProjectDocument>("Project", projectSchema);

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, default: "No description provided" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  projectManager: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // required: true,
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
