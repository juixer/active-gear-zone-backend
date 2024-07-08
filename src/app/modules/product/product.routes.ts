import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controllers";

const route = express.Router();

route.post(
  "/",
  validateRequest(ProductValidation.createProductSchemaValidation),
  ProductController.createProduct
);

route.get("/", ProductController.getAllProducts);

route.patch(
  "/:productId",
  validateRequest(ProductValidation.updateProductSchemaValidation),
  ProductController.updateProduct
);

route.delete("/:productId", ProductController.deleteProduct);

export const ProductRoute = route;