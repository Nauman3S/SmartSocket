"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataByMacAddress = exports.publishToMqtt = exports.postToMqtt = void 0;
const models_1 = require("../models");
const mqtt_1 = require("../libraries/mqtt");
const mqttClient = (0, mqtt_1.connect)();
/**
 * Data from Mqtt
 */
const postToMqtt = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mqttClient.on("message", (topic, payload) => __awaiter(void 0, void 0, void 0, function* () {
            let message = JSON.parse(payload);
            console.log(message);
            console.log("Received Message:", topic, message);
            let data = yield models_1.Mqtt.create(message);
            data.save();
        }));
        console.log("Data Saved");
    }
    catch (error) {
        console.log(error);
    }
});
exports.postToMqtt = postToMqtt;
/**
 * Publish Data to MQtt
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const publishToMqtt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { message } = req === null || req === void 0 ? void 0 : req.body;
        const macAddress = ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.macAddress) + "/smartsocket";
        message = JSON.stringify(message);
        mqttClient.publish(macAddress, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error);
            }
        });
        return res.status(200).json({ message: "Data Published" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.publishToMqtt = publishToMqtt;
/**
 * Get Data By MacAdress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getDataByMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const data = yield models_1.Mqtt.find({ macAddress: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.macAddress });
        return res.status(200).json({ data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getDataByMacAddress = getDataByMacAddress;
