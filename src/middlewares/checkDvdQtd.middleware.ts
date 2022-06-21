import { Request, Response, NextFunction } from "express";

const checkDvdQtd = async (req: Request, res: Response, next: NextFunction) => {
  const available: boolean = req.dvdData.stock.quantity >= req.quantity;
  if (!available) {
    return res.status(422).json({
      error: `currentstock: ${req.dvdData.stock.quantity}, received demand: ${req.quantity}`,
    });
  }

  return next();
};

export default checkDvdQtd;
