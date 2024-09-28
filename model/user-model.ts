import { IUser } from "@/types/IUser";
import { model, models, Schema } from "mongoose";

const addressSchema = new Schema({
  district: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
});

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    address: addressSchema,
    phoneNumber: {
      type: String,
      // validation
    },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IUser>("User", userSchema);
