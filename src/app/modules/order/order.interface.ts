import { Types } from "mongoose";

export type TCart = {
  _id: Types.ObjectId;
  quantity: number;
};
export interface IOrder {
  subTotal: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: "Cash on delivery" | "Credit Card";
  cart: TCart[];
}
