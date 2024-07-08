import { z } from "zod";
const createProductSchemaValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Please provide Product Name" }),
    description: z.string({
      required_error: "Please provide Product Description",
    }),
    category: z.string({ required_error: "Please provide Product Category" }),
    brand: z.string({ required_error: "Please provide Product Brand" }),
    stockQuantity: z.number({
      required_error: "Please provide Product Stock Quantity",
    }),
    rating: z.number().optional(),
    price: z.number({ required_error: "Please provide Product Price" }),
    image: z.string({ required_error: "Please provide Product Image" }),
  }),
});

const updateProductSchemaValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    stockQuantity: z.number().optional(),
    rating: z.number().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductSchemaValidation,
  updateProductSchemaValidation,
};
