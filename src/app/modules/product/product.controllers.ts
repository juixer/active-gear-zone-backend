import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const product = req.body;

  const result = await ProductService.createProductIntoDB(product);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieves successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductService.updateProductIntoDB(productId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  await ProductService.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
