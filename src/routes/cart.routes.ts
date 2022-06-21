import { Router } from "express";

import { cartController } from "../controllers";
import authUserMiddleware from "../middlewares/authUser.middleware";
import checkEmptyCart from "../middlewares/checkEmptyCart.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.put(
    "/pay",
    authUserMiddleware,
    checkEmptyCart,
    cartController.payCart
  );

  return routes;
};
