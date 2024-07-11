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
exports.ProductService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getFilterProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice, category, brand, rating, page, limit } = query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const pQuery = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
        pQuery.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    if (category) {
        pQuery.category = category;
    }
    if (brand) {
        pQuery.brand = brand;
    }
    if (rating !== undefined) {
        pQuery.rating = { $gte: Number(rating) };
    }
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(pQuery).skip(pageNumber * limitNumber).limit(limitNumber), query)
        .search(["name"])
        .sort();
    const result = yield productQuery.modelQuery;
    const totalCount = yield product_model_1.Product.countDocuments(pQuery);
    return { result, totalCount };
});
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
const getLatestProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find().sort({ createdAt: -1 }).limit(8);
    return result;
});
const updateProductIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const result = product_model_1.Product.findByIdAndUpdate(productId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(404, "Product not found");
    }
    const result = product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getFilterProductsFromDB,
    updateProductIntoDB,
    getLatestProductFromDB,
    deleteProductFromDB,
    getSingleProductFromDB,
    getAllProductsFromDB,
};
