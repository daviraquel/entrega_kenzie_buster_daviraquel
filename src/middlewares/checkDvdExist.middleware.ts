import { Request, Response, NextFunction } from "express";
import { Dvd } from "../entities";
import { dvdRepository } from "../repositories";

const checkdvdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dvd: Dvd = await dvdRepository.findOne({
    id: req.params.dvdId,
  });

  if (!dvd) {
    return res.status(404).json({
      error: "dvd not found",
    });
  }

  req.dvdData = dvd;

  return next();
};

export default checkdvdExist;
