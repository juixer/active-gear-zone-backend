import { Types } from "mongoose";

export interface IOrder {
  id: Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
