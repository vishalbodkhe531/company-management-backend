import express from "express";
import { getLoggedUser } from "../../controllers/admin/admin.controller.js";
import { isAuthenticat } from "../../middlewares/auth.middleware.js";

const getRole = express.Router();

getRole.get("/", isAuthenticat(["admin", "employee"]), getLoggedUser);

export default getRole;
