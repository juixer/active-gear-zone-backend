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
exports.OrderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { cart } = payload;
    const productIds = cart.map(item => item._id);
    const products = yield product_model_1.Product.find({ _id: { $in: productIds } });
    for (const item of cart) {
        const product = products.find(p => p._id == item._id);
        const newStockQuantity = (product === null || product === void 0 ? void 0 : product.stockQuantity) - item.quantity;
        const newIsAvailable = newStockQuantity > 0;
        yield product_model_1.Product.findByIdAndUpdate(item._id, {
            stockQuantity: Number(newStockQuantity),
            isAvailable: newIsAvailable,
        }, { new: true });
    }
    const result = yield order_model_1.Order.create(payload);
    return result;
});
exports.OrderService = {
    createOrderIntoDB,
};
