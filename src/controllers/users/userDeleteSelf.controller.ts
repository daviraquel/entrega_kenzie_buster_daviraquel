import { Request, Response } from "express";
import userDeleteSelfService from "../../services/users/userDeleteSelf.service";
import { AppError, handleError } from "../../errors/appError";

const userDeleteSelfController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const { status, message } = await userDeleteSelfService(email);
    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userDeleteSelfController;
