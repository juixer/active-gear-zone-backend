import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getFilterProductsFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, category, brand, rating, page, limit } = query;

  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);

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

  const productQuery = new QueryBuilder(Product.find(pQuery).skip(pageNumber * limitNumber).limit(9), query)
    .search(["name"])
    .sort();

  const result = await productQuery.modelQuery;
  const totalCount = await Product.countDocuments(pQuery);
  return { result, totalCount };
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
  getFilterProductsFromDB,
  updateProductIntoDB,
  getLatestProductFromDB,
  deleteProductFromDB,
  getSingleProductFromDB,
  getAllProductsFromDB,
};
