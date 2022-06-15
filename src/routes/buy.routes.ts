import { Router } from "express";

import buyCreateController from "../controllers/buy/buyCreate.controller";

import authUserMiddleware from "../middlewares/authUser.middleware";

const routes = Router();

export const buyRoutes = () => {
  routes.post("/", authUserMiddleware, buyCreateController);

  return routes;
};
