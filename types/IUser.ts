import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: `customer` | `admin`;
  address?: Address;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  district: string;
  city: string;
}
