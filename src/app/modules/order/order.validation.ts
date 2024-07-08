import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    id: z.string(),
    quantity: z.number(),
    price: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
};
