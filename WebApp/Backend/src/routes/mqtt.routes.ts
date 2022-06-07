import { Router } from "express";
import { postToMqtt, publishToMqtt } from "../controllers/mqtt.controller";

const router: Router = Router();

postToMqtt();

router.post("/publish/:macAddress", publishToMqtt);

export default router;
