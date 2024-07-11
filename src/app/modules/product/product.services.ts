import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, category, brand, rating } = query;

  const pQuery: Record<string, unknown> = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    pQuery.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  if (category) {
    pQuery.category = category;
  }

  if (brand) {
    pQuery.brand = brand;
  }

  if (rating !== undefined) {
    pQuery.rating = { $gte: Number(rating) };
  }

  const productQuery = new QueryBuilder(Product.find(pQuery), query)
    .search(["name"])
    .sort()
    .paginate();

  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const getLatestProductFromDB = async () => {
  const result = await Product.find().sort({ createdAt: -1 }).limit(8);
  return result;
};

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<IProduct>
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const result = Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }
  const result = Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  getLatestProductFromDB,
  deleteProductFromDB,
  getSingleProductFromDB,
};
