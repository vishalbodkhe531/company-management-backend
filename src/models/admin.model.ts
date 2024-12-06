import { Schema, model, Document } from "mongoose";

interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
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
  },
  { timestamps: true }
);

export const Admin = model<AdminDocument>("Admin", adminSchema);
