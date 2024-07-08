import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
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
  deleteProductFromDB,
};
