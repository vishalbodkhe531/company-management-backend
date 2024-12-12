import { AdminDocument } from "../models/admin.model"; 

declare global {
  namespace Express {
    interface Request {
      user?: AdminDocument; 
    }
  }
}
