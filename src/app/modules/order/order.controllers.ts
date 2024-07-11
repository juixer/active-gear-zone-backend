import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { TCart } from "./order.interface";
import { OrderService } from "./order.services";

const createOrder =  catchAsync(async (req, res) => {
  const { cart } = req.body;

  await Promise.all(cart.map(async (item: TCart) => {
    const product = (await Product.findById(item._id)) as IProduct;
    if (item.quantity > product.stockQuantity) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Order quantity exceeds stock quantity",
        data: null,
      });
    }

    if (!product.isAvailable) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Product is not available",
        data: null,
      });
    }
    return {
      _id: item._id,
      quantity: item.quantity,
    };
  }));

  

  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
