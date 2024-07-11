"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route"));
const globalErrHandler_1 = __importDefault(require("./app/middleware/globalErrHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://active-gear-frontend.vercel.app"], credentials: true }));
// application routes
app.use("/api", route_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Active Gear Zone Server!");
});
app.use(globalErrHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
