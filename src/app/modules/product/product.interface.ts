export interface IProduct {
  _id: import("mongoose").Types.ObjectId;
  name: string;
  description: string;
  category: string;
  brand: string;
  stockQuantity: number;
  rating?: number;
  price: number;
  image: string;
  isAvailable?: boolean;
}
