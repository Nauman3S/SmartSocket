"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const middlewares_1 = __importDefault(require("./middlewares"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = parseInt(config_1.default.PORT, 10);
//Initializing Middlewares
(0, middlewares_1.default)(app);
//Database Connection
(0, database_1.default)();
//Frontend Build Route
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../Frontend/build")));
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../Frontend/build/index.html"));
});
//Initialize Routes
app.use("/api", routes_1.default);
//Listening to PORT
app.listen(PORT, () => console.log(`${(0, colors_1.blue)("Server Running On PORT: ")} ${(0, colors_1.bold)((0, colors_1.blue)(`${config_1.default.PORT}`))}
${(0, colors_1.yellow)("API URL: ")} ${(0, colors_1.blue)(`http://localhost:${config_1.default.PORT}/api`)}`));
