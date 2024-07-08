import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { OrderService } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  const { id, quantity: orderQuantity } = req.body;

  const product = (await Product.findById(id)) as IProduct;

  if (orderQuantity > product.stockQuantity) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Order quantity exceeds stock quantity",
      data: null,
    });
  }

  if (product.isAvailable === false) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Product is not available",
      data: null,
    });
  }

  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
