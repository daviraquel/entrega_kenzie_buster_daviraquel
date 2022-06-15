import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import buyCreateService from "../../services/buy/buyCreate.service";

const buyCreateController = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;

    const { status, message } = await buyCreateService(userEmail);

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default buyCreateController;
