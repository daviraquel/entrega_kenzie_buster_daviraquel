import { Request, Response, NextFunction } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";

const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailExists: User = await userRepository.findOne({
    email: req.validData.email,
  });

  if (emailExists) {
    return res.status(409).json({
      message: `Key (email)=(${req.validData.email}) already exists.`,
    });
  }

  return next();
};

export default checkDuplicateEmail;
