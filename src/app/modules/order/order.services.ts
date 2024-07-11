import { IProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: IOrder) => {

  const {cart} = payload;

  const productIds =  cart.map(item => item._id)

  const products = await Product.find({_id : {$in: productIds}}) as IProduct[];
  for (const item of cart) {
    const product = products.find(p => p._id == item._id);

    const newStockQuantity = (product?.stockQuantity as number) - item.quantity;
    const newIsAvailable = newStockQuantity > 0;

    await Product.findByIdAndUpdate(
      item._id,
      {
        stockQuantity: Number(newStockQuantity),
        isAvailable: newIsAvailable,
      },
      { new: true }
    );
  }

  const result = await Order.create(payload);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
