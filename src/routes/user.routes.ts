import { Router } from "express";

import userCreateController from "../controllers/users/userCreate.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userListController from "../controllers/users/userList.controller";
import userListOneController from "../controllers/users/userListOne.controller";
import userDeleteSelfController from "../controllers/users/userDeleteSelf.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";

import authUserMiddleware from "../middlewares/authUser.middleware";
import { validateUserCreateMiddleware } from "../middlewares/validateUserCreate.middleware";
import { userCreateSchema } from "../middlewares/validateUserCreate.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/",
    validateUserCreateMiddleware(userCreateSchema),
    userCreateController
  );
  routes.post("/", userLoginController);
  routes.get("/", authUserMiddleware, userListController);
  routes.get("/me", userListOneController);
  routes.delete("/me", authUserMiddleware, userDeleteSelfController);
  routes.patch("/me", authUserMiddleware, userUpdateController);

  return routes;
};
