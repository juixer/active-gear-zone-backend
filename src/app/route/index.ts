import { Router } from "express";
import { ProductRoute } from "../modules/product/product.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    router: ProductRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
