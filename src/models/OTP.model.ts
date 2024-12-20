import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  verificationCode: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
