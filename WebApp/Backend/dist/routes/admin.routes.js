"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    dest: "uploads/",
    limits: { fieldSize: 25 * 1024 * 1024 },
});
const router = (0, express_1.Router)();
/**
 * @body
 * file - Express.Multer.File
 */
router.post("/ota/upload", upload.single("file"), admin_controller_1.uploadFileToS3);
/**
 * @body
 * key - string
 */
router.delete("/ota/delete/:key", admin_controller_1.deleteFileFromS3);
/**
 * Get All Files
 */
router.get("/ota", admin_controller_1.getAllFiles);
/**
 * Get Dashbord Counts
 */
router.get("/count", admin_controller_1.dashboardCounts);
/**
 * Get All Users
 */
router.get("/all-users", admin_controller_1.getAllUsers);
/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", admin_controller_1.getAllUsersMacaddress);
/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", admin_controller_1.getAllUsersMqttData);
exports.default = router;
