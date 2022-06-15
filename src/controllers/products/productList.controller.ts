import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import productListService from "../../services/products/productList.service";

const productListController = async (req: Request, res: Response) => {
  try {
    const { status, message } = await productListService();

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productListController;
