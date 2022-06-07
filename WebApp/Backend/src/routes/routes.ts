import { Router } from "express";
import { authRoutes, macAddressRoutes, mqttRoutes } from ".";
import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

//All Auth Routes
router.use("/auth", authRoutes);

//All Macaddress Routes
router.use("/macAddress", isAuthenticated, macAddressRoutes);

//All Mqtt Routes
router.use("/mqtt", mqttRoutes);

export default router;
