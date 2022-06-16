"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = exports.mqttRoutes = exports.macAddressRoutes = exports.authRoutes = void 0;
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var macAddress_routes_1 = require("./macAddress.routes");
Object.defineProperty(exports, "macAddressRoutes", { enumerable: true, get: function () { return __importDefault(macAddress_routes_1).default; } });
var mqtt_routes_1 = require("./mqtt.routes");
Object.defineProperty(exports, "mqttRoutes", { enumerable: true, get: function () { return __importDefault(mqtt_routes_1).default; } });
var admin_routes_1 = require("./admin.routes");
Object.defineProperty(exports, "adminRoutes", { enumerable: true, get: function () { return __importDefault(admin_routes_1).default; } });
