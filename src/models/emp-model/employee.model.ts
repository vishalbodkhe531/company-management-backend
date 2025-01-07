import { Schema, model, Document } from "mongoose";

interface EmployeeDoc extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  resignationDate: Date;
  qualification: string;
  department: string;
  address: string;
  profilePic: string;
  gender: string;
  isVerified: boolean;
  role: string;
}

const employeeSchema = new Schema<EmployeeDoc>(
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

    department: {
      type: String,
      required: [true, "Department is required"],
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
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "employee",
    },
  },
  { timestamps: true }
);

export const Employee = model<EmployeeDoc>("Employee", employeeSchema);

// asdfasf
