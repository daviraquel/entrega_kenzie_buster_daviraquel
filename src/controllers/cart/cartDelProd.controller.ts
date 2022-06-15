import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import cartDelProdService from "../../services/cart/cartDelProd.service";

const cartDelProdController = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;
    const { productId } = req.params;

    const { status, message } = await cartDelProdService(productId, userEmail);

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartDelProdController;
