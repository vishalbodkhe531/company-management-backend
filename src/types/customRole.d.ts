import { AdminDocument } from "../models/admin-model/admin.model.ts";
import { EmployeeDocument } from "../models/emp-model/employee.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AdminDocument | EmployeeDocument; // Adjust to match your model types
      userRole?: string; // Add the userRole property
    }
  }
}
