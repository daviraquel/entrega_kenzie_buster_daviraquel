import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(403, "wrong email/pasword");
  }
  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(403, "wrong email/pasword");
  }

  const token = jwt.sign({ email: email }, String(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });

  return { status: 201, message: token };
};

export default userLoginService;
