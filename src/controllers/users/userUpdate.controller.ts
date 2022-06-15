import { Request, Response } from "express";
import userUpdateService from "../../services/users/userUpdate.service";
import { AppError, handleError } from "../../errors/appError";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const { password } = req.body;

    if (!password) {
      throw new Error("missing password");
    }

    const { message, status } = await userUpdateService(email, password);

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userUpdateController;
