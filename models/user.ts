import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email?: string;
  phone?: string;
  password: string;
  role: "employ" | "admin";
  location?: {
    province: string;
    district: string;
    municipality: string;
    wardNumber: string;
    pollingCenter: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ["employ", "admin"], default: "employ" },
    location: {
      province: { type: String },
      district: { type: String },
      municipality: { type: String },
      wardNumber: { type: String },
      pollingCenter: { type: String },
    },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", userSchema);
