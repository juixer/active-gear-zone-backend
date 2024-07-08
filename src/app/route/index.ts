import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    router: ProductRoutes,
  },
  {
    path: "/order",
    router: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
