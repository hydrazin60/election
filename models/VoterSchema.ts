import { Schema, model, Document, Types, models } from "mongoose";

export interface IVoter extends Document {
  serial_no: number;
  voter_id: number;
  full_name: string;
  age: number;
  gender: "male" | "female" | "other";
  spouse_name?: string;
  parent_name?: string;
  location: Types.ObjectId;
}

const VoterSchema = new Schema<IVoter>(
  {
    serial_no: { type: Number, required: true },
    voter_id: { type: Number, required: true, unique: true },
    full_name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    spouse_name: { type: String },
    parent_name: { type: String },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  },
  { timestamps: true }
);

export default models.Voter || model<IVoter>("Voter", VoterSchema);
