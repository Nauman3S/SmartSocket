import { config } from "dotenv";
config();

const Config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
};

export default Config;
