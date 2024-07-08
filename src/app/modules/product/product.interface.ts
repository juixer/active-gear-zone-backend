export interface IProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  stockQuantity: number;
  rating?: number;
  price: number;
  image: string;
}
