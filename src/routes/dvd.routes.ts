import { Router } from "express";

import dvdController from "../controllers/dvd.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import checkAdmPermission from "../middlewares/checkAdmPermission.middleware";
import authUserMiddleware from "../middlewares/authUser.middleware";
import dvdCreateSchema from "../schemas/dvd/dvdCreate.schema";
import dvdBuySchema from "../schemas/dvd/dvdBuy.schema";
import checkdvdExist from "../middlewares/checkDvdExist.middleware";
import checkDvdQtd from "../middlewares/checkDvdQtd.middleware";

const routes = Router();

export const dvdRoutes = () => {
  routes.post(
    "/register",
    schemaValidation(dvdCreateSchema),
    checkAdmPermission,
    dvdController.createDvds
  );
  routes.get("/", dvdController.listDvds);
  routes.post(
    "/buy/:dvdId",
    authUserMiddleware,
    schemaValidation(dvdBuySchema),
    checkdvdExist,
    checkDvdQtd,
    dvdController.buyDvd
  );

  return routes;
};
