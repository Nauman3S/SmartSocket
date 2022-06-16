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
exports.getButtonByMacAddress = exports.removeMacAddress = exports.updateBtnState = exports.addMacAddress = exports.getAllMacAddress = void 0;
const models_1 = require("../models");
/**
 * Get All Macaddress of LoggedIn User
 * @param {Request} req
 * @param {Request} req
 */
const getAllMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const macAddress = yield models_1.MacAddress.findOne({
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        }).populate({ path: "userId", select: "-password" });
        return res.status(200).json({ data: macAddress });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllMacAddress = getAllMacAddress;
/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
const addMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        yield models_1.MacAddress.findOneAndUpdate({ userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            $push: {
                deviceDetails: {
                    macAddress: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress,
                    btnName: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.btnName,
                    btnState: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.btnState,
                    date: new Date(),
                },
            },
        }, { upsert: true });
        return res.status(200).json({ message: "Button Added Successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.addMacAddress = addMacAddress;
/**
 * Update Button State
 * @param {Request} req
 * @param {Request} req
 */
const updateBtnState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        yield models_1.MacAddress.findOneAndUpdate({
            userId: (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f._id,
            deviceDetails: { $elemMatch: { macAddress: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.macAddress } },
        }, {
            $set: { "deviceDetails.$.btnState": (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.btnState },
        });
        return res.status(200).json({ message: "Button Added Successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.updateBtnState = updateBtnState;
/**
 * Add New Macaddress
 * @param {Request} =req
 * @param {Request} req
 */
const removeMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        console.log(req.body.macAddress);
        yield models_1.MacAddress.findOneAndUpdate({ userId: (_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j._id }, {
            $pull: {
                deviceDetails: { macAddress: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.macAddress },
            },
        });
        return res.status(200).json({ message: "Button Deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.removeMacAddress = removeMacAddress;
/**
 * Get Button By MacAddress
 * @param {Request} req
 * @param {Request} req
 */
const getButtonByMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o;
    try {
        const data = yield models_1.Mqtt.find({ macAddress: (_l = req === null || req === void 0 ? void 0 : req.params) === null || _l === void 0 ? void 0 : _l.macAddress });
        const button = yield models_1.MacAddress.find({
            userId: (_m = req === null || req === void 0 ? void 0 : req.user) === null || _m === void 0 ? void 0 : _m._id,
        }, {
            deviceDetails: {
                $elemMatch: { macAddress: (_o = req === null || req === void 0 ? void 0 : req.params) === null || _o === void 0 ? void 0 : _o.macAddress },
            },
        });
        return res.status(200).json({ button, data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getButtonByMacAddress = getButtonByMacAddress;
