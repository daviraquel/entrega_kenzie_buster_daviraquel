import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";

const userCreateService = async ({ name, email, password }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(409, "email already exists");
  }

  const cart = new Cart();
  cart.subtotal = 0;
  cartRepository.create(cart);
  await cartRepository.save(cart);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = bcrypt.hashSync(password, 10);
  newUser.cart = cart;

  userRepository.create(newUser);
  await userRepository.save(newUser);

  return { status: 201, message: newUser };
};

export default userCreateService;
