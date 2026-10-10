import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { userRoles } from "@/constants";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  roles: string[];
  profilePicture: {
    id?: string;
    url?: string | null;
  };
  password?: string | null;
  authProviders: {
    provider: string;
    providerId: string;
  }[];
  subscription?: {
    id?: string;
    customerId?: string;
    created?: Date;
    status?: string;
    startDate?: Date;
    currentPeriodEnd?: Date;
    nextPaymentAttempt?: Date;
  };
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: [String],
      enum: userRoles,
      default: ["user"],
    },
    profilePicture: {
      id: { type: String },
      url: { type: String, default: null },
    },
    password: {
      type: String,
      default: null,
    },
    authProviders: [
      {
        provider: { type: String, required: true },
        providerId: { type: String, required: true },
      },
    ],
    subscription: {
      id: { type: String },
      customerId: { type: String },
      created: { type: Date },
      status: { type: String },
      startDate: { type: Date },
      currentPeriodEnd: { type: Date },
      nextPaymentAttempt: { type: Date },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
