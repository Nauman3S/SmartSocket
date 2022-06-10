import { model, Schema, Types } from "mongoose";
import { IMacAddress } from "../types/types";

const macAddressSchema = new Schema<IMacAddress>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    deviceDetails: [
      {
        macAddress: { type: String },
        btnName: { type: String },
        btnState: { type: String },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const MacAddress = model<IMacAddress>("MacAddress", macAddressSchema);
export default MacAddress;
