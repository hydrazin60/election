import { Schema, model, Document, models } from "mongoose";

export interface ILocation extends Document {
  province: string;
  district: string;
  municipality: string;
  wardNumber: number;
  pollingCenter: string;
  hoRConstituency?: number; // प्रतिनिधि सभा निर्वाचन क्षेत्र
  provincialConstituency?: number; // प्रदेश सभा निर्वाचन क्षेत्र
}

const LocationSchema = new Schema<ILocation>(
  {
    province: { type: String, required: true },
    district: { type: String, required: true },
    municipality: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    pollingCenter: { type: String, required: true },
    hoRConstituency: { type: Number }, // प्रतिनिधि सभा निर्वाचन क्षेत्र
    provincialConstituency: { type: Number }, // प्रदेश सभा निर्वाचन क्षेत्र
  },
  { timestamps: true }
);

export default models.Location || model<ILocation>("Location", LocationSchema);
