import QueryBuilder from "../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = (payload: IProduct) => {
  const result = Product.create(payload);
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

const updateProductIntoDB = (productId: string, payload: Partial<IProduct>) => {
  const result = Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = (productId: string) => {
  const result = Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
