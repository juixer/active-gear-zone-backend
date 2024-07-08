import { IProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: IOrder) => {
  const { id, quantity: orderQuantity } = payload;

  const product = (await Product.findById(id)) as IProduct;

  const { stockQuantity } = product;
  const quantity = stockQuantity - orderQuantity;
  const isAvailable = quantity > 0;

  await Product.findByIdAndUpdate(
    id,
    {
      stockQuantity: quantity,
      isAvailable: isAvailable,
    },
    { new: true }
  );

  const result = await Order.create(payload);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
