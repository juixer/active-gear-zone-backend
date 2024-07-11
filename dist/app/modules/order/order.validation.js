"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const cartItemSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    quantity: zod_1.z.number().min(1).max(100),
});
const cartValidation = zod_1.z.array(cartItemSchema);
const createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        subTotal: zod_1.z.number(),
        paymentMethod: zod_1.z.enum(['Cash on delivery', "Credit Card"]),
        cart: cartValidation
    }),
});
exports.OrderValidation = {
    createOrderSchema,
};
