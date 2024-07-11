"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = require("../modules/product/product.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        router: product_routes_1.ProductRoutes,
    },
    {
        path: "/order",
        router: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
