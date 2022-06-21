import { Router } from "express";

import { userController } from "../controllers";

import schemaValidation from "../middlewares/schemaValidation.middleware";
import checkDuplicateEmail from "../middlewares/checkDuplicateEmail.middleware";
import checkAdmCreate from "../middlewares/checkAdmCreate.middleware";

import { userCreateSchema } from "../schemas/user/userCreate.schema";
import userLoginSchema from "../schemas/user/userLogin.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/register",
    schemaValidation(userCreateSchema),
    checkDuplicateEmail,
    checkAdmCreate,
    userController.createUser
  );
  routes.post(
    "/login",
    schemaValidation(userLoginSchema),
    userController.loginUser
  );

  return routes;
};
