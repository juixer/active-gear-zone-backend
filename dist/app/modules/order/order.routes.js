"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controllers_1 = require("./order.controllers");
const route = express_1.default.Router();
route.post("/", (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderSchema), order_controllers_1.OrderController.createOrder);
exports.OrderRoutes = route;
