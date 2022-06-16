"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const options = (process.env.NODE_ENV === "development" && {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) ||
    (process.env.NODE_ENV === "production" && {
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
function default_1() {
    var _a;
    (0, mongoose_1.connect)((_a = config_1.default.MONGO_URI) !== null && _a !== void 0 ? _a : "", options, () => {
        try {
            console.log((0, colors_1.blue)(`DB connected ✅`));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = default_1;
