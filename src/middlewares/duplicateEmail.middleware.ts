import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const duplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

    if (user) {
      throw new AppError(409, "email already exists");
    }

    next();
  } catch (err: any) {
    res.status = err.statusCode;
    return res.json({ error: err.message });
  }
};

export default duplicateEmail;
