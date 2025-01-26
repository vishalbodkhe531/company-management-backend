import mongoose, { Schema, model, Document } from "mongoose";

export interface EmployeeDocument extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  resignationDate: Date;
  qualification: string;
  skill: string;
  address: string;
  profilePic: string;
  gender: string;
  isVerified: string;
  role: string;
  professionalSummary: string;
  employmentDetails: string;
  educationDetails: string;
  achievements: string;
  project: Array<{ name: string; description: string }>;
}

const employeeSchema = new Schema<EmployeeDocument>(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
    },

    lastName: {
      type: String,
      required: [true, "LastName is required"],
    },

    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
    },

    skill: {
      type: String,
      required: [true, "Skill is required"],
    },

    resignationDate: {
      type: Date,
      default: null,
    },

    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },

    isVerified: {
      type: String,
      default: "pendding",
      enum: ["accepted", "rejected", "pendding"],
      required: [true, "Gender is required"],
    },

    role: {
      type: String,
      default: "employee",
    },

    professionalSummary: {
      type: String,
    },

    employmentDetails: {
      type: String,
    },

    educationDetails: {
      type: String,
    },

    achievements: {
      type: String,
    },

    project: [
      {
        name: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export const Employee = model<EmployeeDocument>("Employee", employeeSchema);
