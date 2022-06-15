import * as express from "express";
import { IUserCreate } from "../../interfaces/users/index";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      newUser: IUserCreate;
    }
  }
}
