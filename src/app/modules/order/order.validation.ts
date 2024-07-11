import { z } from "zod";

const cartItemSchema = z.object({
  _id: z.string(),
  quantity: z.number().min(1).max(100),
});

const cartValidation = z.array(cartItemSchema);

const createOrderSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    subTotal: z.number(),
    paymentMethod : z.enum(['Cash on delivery', "Credit Card"]),
    cart : cartValidation
  }),
});

export const OrderValidation = {
  createOrderSchema,
};
