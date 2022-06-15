import { Request, Response } from "express";
import userListService from "../../services/users/userList.service";
import { AppError, handleError } from "../../errors/appError";

const userListController = async (req: Request, res: Response) => {
  try {
    const { message, status } = await userListService();

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userListController;
