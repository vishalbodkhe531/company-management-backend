import { Schema, model, Document } from "mongoose";

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  gender: string;
  isVerified: boolean;
  verificationCode: string;
  role: string;
  OTPexpiresAt: Date;
}

const adminSchema = new Schema<AdminDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Simple email regex
        message: "Please provide a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Password is required"],
    },

    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "admin",
    },

    verificationCode: String,

    OTPexpiresAt: Date,
  },
  { timestamps: true }
);

export const Admin = model<AdminDocument>("Admin", adminSchema);
