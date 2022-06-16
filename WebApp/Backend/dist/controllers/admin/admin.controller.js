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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersMqttData = exports.getAllUsersMacaddress = exports.getAllUsers = exports.dashboardCounts = exports.getAllFiles = exports.deleteFileFromS3 = exports.uploadFileToS3 = void 0;
const models_1 = require("../../models");
// import { IOta } from "../../types/types";
const multer_1 = require("../../libraries/multer");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */
const uploadFileToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const unlinkFile = (0, util_1.promisify)(fs_1.default.unlink);
        const file = req === null || req === void 0 ? void 0 : req.file;
        const result = yield (0, multer_1.uploadFile)(file);
        unlinkFile(file.path);
        const ota = yield models_1.Ota.create({
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
            fileURL: result.Location,
            fileName: file === null || file === void 0 ? void 0 : file.originalname,
            key: result.Key,
        });
        ota.save();
        return res.status(200).json({ message: "File Uploaded" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.uploadFileToS3 = uploadFileToS3;
/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */
const deleteFileFromS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { Key }: { Key: string } = req?.body;
        //Deleting File from S3
        yield (0, multer_1.deleteFile)(req === null || req === void 0 ? void 0 : req.params.key);
        //Deleting File from DB
        yield models_1.Ota.findOneAndDelete({ key: req.params.key });
        return res.status(200).json({ message: "File Deleted" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.deleteFileFromS3 = deleteFileFromS3;
/**
 * Get All Files
 * @param {Request} req
 * @param {Request} req
 */
const getAllFiles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ota = yield models_1.Ota.find();
        return res.status(200).json({ ota });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllFiles = getAllFiles;
/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const dashboardCounts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.countDocuments({ role: "client" });
        const macAddressess = yield models_1.Mqtt.countDocuments();
        const mqtt = yield models_1.Mqtt.countDocuments();
        const ota = yield models_1.Ota.countDocuments();
        return res.status(200).json({ users, macAddressess, mqtt, ota });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.dashboardCounts = dashboardCounts;
/**
 * Get All Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find({ role: "client" });
        return res.status(200).json({ users });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsersMacaddress = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Macaddressess = yield models_1.MacAddress.find().populate({
            path: "userId",
            select: "-password",
        });
        return res.status(200).json({ Macaddressess });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsersMacaddress = getAllUsersMacaddress;
/**
 * Get All Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUsersMqttData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mqttData = yield models_1.Mqtt.find();
        return res.status(200).json({ mqttData });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllUsersMqttData = getAllUsersMqttData;
