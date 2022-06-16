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
exports.myProfile = exports.signUp = exports.login = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
/**
 * This Function allows User to login To his respective Dashboard based on Role [Admin, Client]
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield (0, helpers_1.userFind)({
            email: email.toLowerCase(),
        });
        if (!user) {
            return res.status(401).json({ message: "User not exists on this email" });
        }
        if (!(yield user.comparePassword(password))) {
            return res.status(401).json({ message: "Email/Password does not match" });
        }
        const token = yield user.getToken();
        res.status(200).json({ message: "Logged In", token, role: user.role });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.login = login;
/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, } = req === null || req === void 0 ? void 0 : req.body;
        if (yield (0, helpers_1.userExists)(email)) {
            return res
                .status(500)
                .json({ message: `User already registered with this email ${email}` });
        }
        if (!(yield (0, helpers_1.validateEmail)(email))) {
            return res
                .status(500)
                .json({ message: "Please enter correct email address" });
        }
        const user = yield models_1.User.create({
            fullName,
            email,
            password,
        });
        user.save();
        return res.status(200).json({ message: "User Signed Up Successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.signUp = signUp;
/**
 * Get :Logged In User Profile from database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield models_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.myProfile = myProfile;
