"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
        default: 1,
    },
});
const orderSchema = new mongoose_1.Schema({
    subTotal: {
        type: Number,
        required: true,
        min: 0.01,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cart: {
        type: [cartSchema],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Cash on delivery", "Credit Card"],
        default: "Cash on delivery",
    }
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
