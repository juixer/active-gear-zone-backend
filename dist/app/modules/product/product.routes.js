"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controllers_1 = require("./product.controllers");
const route = express_1.default.Router();
route.post("/", (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductSchemaValidation), product_controllers_1.ProductController.createProduct);
route.get("/", product_controllers_1.ProductController.getAllProducts);
route.get("/filter", product_controllers_1.ProductController.getFilterProducts);
route.get("/latest", product_controllers_1.ProductController.getLatestProduct);
route.get("/:productId", product_controllers_1.ProductController.getSingleProduct);
route.patch("/:productId", (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductSchemaValidation), product_controllers_1.ProductController.updateProduct);
route.delete("/:productId", product_controllers_1.ProductController.deleteProduct);
exports.ProductRoutes = route;
