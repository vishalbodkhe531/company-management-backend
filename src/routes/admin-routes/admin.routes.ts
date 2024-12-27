import express from "express";
import { isAuthenticat } from "../../middlewares/auth.middleware.js";
import {
  createAdmin,
  deleteAdmin,
  getLoginAdmin,
  googleLogin,
  loginAdmin,
  logoutAdmin,
  sendOTP,
  updateAdmin,
  verificationOTP,
} from "../../controllers/admin/admin.controller.js";
// import {
//   createAdmin,
//   deleteAdmin,
//   getLoginAdmin,
//   googleLogin,
//   loginAdmin,
//   logoutAdmin,
//   sendOTP,
//   updateAdmin,
//   verificationOTP,
// } from "../../controllers/admin/admin.controller.js";
// import { isAuthenticat } from "../../middlewares/auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/logged", isAuthenticat, getLoginAdmin);
adminRoutes.get("/logout", logoutAdmin);

adminRoutes.post("/new", createAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/google-login", googleLogin);
adminRoutes.post("/varify-otp", verificationOTP);
adminRoutes.post("/send-otp", sendOTP);

adminRoutes.route("/:id").delete(deleteAdmin).put(isAuthenticat, updateAdmin);

export default adminRoutes;
