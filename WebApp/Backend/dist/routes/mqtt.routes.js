"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mqtt_controller_1 = require("../controllers/mqtt.controller");
const router = (0, express_1.Router)();
(0, mqtt_controller_1.postToMqtt)();
/**
 * Publish data to Mqtt
 */
router.post("/publish/:macAddress", mqtt_controller_1.publishToMqtt);
/**
 * Get Data By MacAdress
 * @params - {macAddress} - {string}
 */
router.post("/data", mqtt_controller_1.getDataByMacAddress);
exports.default = router;
