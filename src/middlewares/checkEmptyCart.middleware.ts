import { Request, Response, NextFunction } from "express";
import { cartRepository } from "../repositories";

const checkEmptyCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cart = await cartRepository.findOne({
    user: { id: req.userData.id },
  });

  if (!cart.dvd || cart.total === 0) {
    return res.status(422).json({
      error: `Your cart is empty`,
    });
  }

  return next();
};

export default checkEmptyCart;
