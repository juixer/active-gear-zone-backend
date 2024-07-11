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
  const query = req.query;
  const result = await ProductService.getAllProductsFromDB(query);

  if (!result.length) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "no data found",
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products retrieves successfully",
      data: result,
    });
  }
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductService.getSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieve successfully",
    data: result,
  });
});

const getLatestProduct =catchAsync(async (req, res) => {
  const result = await ProductService.getLatestProductFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieves successfully",
    data: result,
  });
})


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
  getLatestProduct,
  deleteProduct,
  getSingleProduct
};
