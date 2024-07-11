import { model, Schema } from "mongoose";
import { IOrder, TCart } from "./order.interface";

const cartSchema = new Schema<TCart>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    default: 1,
  },
});

const orderSchema = new Schema<IOrder>({
  subTotal: {
    type: Number,
    required: true,
    min: 0.01,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: {
    type: [cartSchema],
    required: true,
  },
  paymentMethod:{
    type: String,
    required: true,
    enum: ["Cash on delivery", "Credit Card"],
    default: "Cash on delivery",
  }
});

export const Order = model<IOrder>("Order", orderSchema);
