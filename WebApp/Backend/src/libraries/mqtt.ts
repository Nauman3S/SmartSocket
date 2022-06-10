import mqtt from "mqtt";
import { blue, bold, yellow } from "colors";

const topic = "smartsocket/#";
const host = "broker.hivemq.com";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

export const connect = () => {
  try {
    let client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000000,
      username: "hello",
      password: "hello",
      reconnectPeriod: 1000000,
    });
    client.on("connect", () => {
      console.log(bold(yellow("MQTT Connected")));
      client.subscribe([topic], () => {
        console.log(
          `${bold("MQTT: ")}${blue(`Subscribed to ${bold(topic)} ✅`)}`
        );
      });
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};
