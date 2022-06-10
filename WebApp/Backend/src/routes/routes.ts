import { Router } from "express";
import { authRoutes, macAddressRoutes, mqttRoutes, adminRoutes } from ".";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/validator.middleware";

const router: Router = Router();

//All Auth Routes
router.use("/auth", authRoutes);

//All Macaddress Routes
router.use("/macAddress", isAuthenticated, macAddressRoutes);

//All Mqtt Routes
router.use("/mqtt", mqttRoutes);

//All Admin Routes
router.use("/admin", isAuthenticated, isAdmin, adminRoutes);
export default router;
