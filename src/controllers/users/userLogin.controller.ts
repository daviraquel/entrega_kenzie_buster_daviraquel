import { Request, Response } from "express";

import userLoginService from "../../services/users/userLogin.service";
import { AppError, handleError } from "../../errors/appError";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { status, message } = await userLoginService({ email, password });

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userLoginController;
