import { Router } from "express";

import productCreateController from "../controllers/products/productCreate.controller";
import productListController from "../controllers/products/productList.controller";

const routes = Router();

export const productRoutes = () => {
  routes.post("/", productCreateController);
  routes.get("/", productListController);

  return routes;
};
