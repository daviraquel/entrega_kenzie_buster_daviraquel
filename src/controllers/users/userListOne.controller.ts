import { Request, Response } from "express";
import userListOneService from "../../services/users/userListOne.service";
import { AppError, handleError } from "../../errors/appError";

const userListOneController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const { status, message } = await userListOneService(email);
    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userListOneController;
