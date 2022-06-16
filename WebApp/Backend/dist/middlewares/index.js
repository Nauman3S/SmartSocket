"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
/**
 * Top Level Middlewares
 *
 * `CORS`
 *
 * `express.json`
 *
 * `urlencoded`
 *
 * `morgan`
 */
function default_1(app) {
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, express_1.json)({}));
    app.use((0, express_1.urlencoded)({ extended: true }));
}
exports.default = default_1;
