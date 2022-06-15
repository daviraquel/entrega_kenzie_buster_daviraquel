import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import cartAddProdService from "../../services/cart/cartAddProd.service";

const cartAddProdController = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;
    const { productId } = req.body;

    const { status, message } = await cartAddProdService(productId, userEmail);

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartAddProdController;
