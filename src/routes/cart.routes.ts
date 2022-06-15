import { Router } from "express";

import cartAddProdController from "../controllers/cart/cartAddProd.controller";
import cartDelProdController from "../controllers/cart/cartDelProd.controller";
import authUserMiddleware from "../middlewares/authUser.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.post("/", authUserMiddleware, cartAddProdController);
  routes.delete("/:productId", authUserMiddleware, cartDelProdController);

  return routes;
};
