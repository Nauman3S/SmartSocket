import { blue } from "colors";
import { connect, ConnectOptions } from "mongoose";
import config from "../config";

export default function (): void {
  connect(
    config.MONGO_URI ?? "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectOptions,
    () => {
      try {
        console.log(blue(`DB connected ✅`));
      } catch (error) {
        console.log(error);
      }
    }
  );
}
