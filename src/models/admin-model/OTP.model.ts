import { Document, Schema, model } from "mongoose";

interface OTPDocument extends Document {
  email: string;
  verificationCode: string;
  expiresAt: Date;
}

const otpSchema = new Schema({
  email: { type: String, required: true },
  verificationCode: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OTP = model<OTPDocument>("OTP", otpSchema);

export default OTP;
