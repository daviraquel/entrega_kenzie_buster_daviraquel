import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import productCreateService from "../../services/products/productCreate.service";

const productCreateController = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const { status, message } = await productCreateService({
      name,
      description,
      price,
    });

    return res.status(status).json(message);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productCreateController;
