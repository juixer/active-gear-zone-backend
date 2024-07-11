"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Please provide Product Name" }),
        description: zod_1.z.string({
            required_error: "Please provide Product Description",
        }),
        category: zod_1.z.string({ required_error: "Please provide Product Category" }),
        brand: zod_1.z.string({ required_error: "Please provide Product Brand" }),
        stockQuantity: zod_1.z.number({
            required_error: "Please provide Product Stock Quantity",
        }),
        rating: zod_1.z.number().optional(),
        price: zod_1.z.number({ required_error: "Please provide Product Price" }),
        image: zod_1.z.string({ required_error: "Please provide Product Image" }),
    }),
});
const updateProductSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        stockQuantity: zod_1.z.number().optional(),
        rating: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.ProductValidation = {
    createProductSchemaValidation,
    updateProductSchemaValidation,
};
