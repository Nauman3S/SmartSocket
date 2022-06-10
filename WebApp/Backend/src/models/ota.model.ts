import { model, Schema, Types } from "mongoose";
import { IOta } from "../types/types";

const otaSchema = new Schema<IOta>(
  {
    userId: { type: Types.ObjectId },
    fileURL: { type: String },
    fileName: { type: String },
    key: { type: String },
  },
  { timestamps: true }
);

const Ota = model<IOta>("OTA", otaSchema);
export default Ota;
