import { Types, Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
interface userI {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDocument extends userI, Document, ITimestamps {
  comparePassword(password: string): Promise<boolean>;
  getToken(): string;
}

export interface IMacAddress extends Document, ITimestamps {
  userId: Types.ObjectId;
  macAddress: string[];
}

export interface IMqtt extends Document, ITimestamps {
  macAddress: string;
  currentValue: string;
  switchState: number;
}

export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}
