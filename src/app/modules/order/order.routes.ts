import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controllers";

const route = express.Router();

route.post(
  "/",
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder
);

export const OrderRoutes = route;
