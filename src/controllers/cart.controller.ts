import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  payCart = async (req: Request, res: Response) => {
    const { status, message } = await cartService.payCart(req);
    return res.status(status).json(message);
  };
}

export default new CartController();
