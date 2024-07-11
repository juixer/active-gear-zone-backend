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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_model_1 = require("../product/product.model");
const order_services_1 = require("./order.services");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cart } = req.body;
    yield Promise.all(cart.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = (yield product_model_1.Product.findById(item._id));
        if (item.quantity > product.stockQuantity) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: "Order quantity exceeds stock quantity",
                data: null,
            });
        }
        if (!product.isAvailable) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: "Product is not available",
                data: null,
            });
        }
        return {
            _id: item._id,
            quantity: item.quantity,
        };
    })));
    const result = yield order_services_1.OrderService.createOrderIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order placed successfully",
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
};
