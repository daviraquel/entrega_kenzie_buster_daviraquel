import { Request } from "express";
import { sign } from "jsonwebtoken";
import { Cart, User } from "../entities";
import { cartRepository, userRepository } from "../repositories";
import * as dotenv from "dotenv";
import { hash } from "bcrypt";
import { userCreateSerializedSchema } from "../schemas/user/userCreate.schema";

dotenv.config();

class UserService {
  loginUser = async ({ validData }: Request) => {
    const user: User = await userRepository.findOne({
      email: validData.email,
    });

    if (!user) {
      return {
        status: 401,
        message: { error: "Wrong username/password" },
      };
    }

    if (!(await user.comparePassword(validData.password))) {
      return {
        status: 401,
        message: { error: "Wrong username/password" },
      };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  createUser = async ({ validData }: Request) => {
    validData.password = await hash(validData.password, 10);
    const userCart = new Cart();
    validData.cart = userCart;

    await cartRepository.save(userCart);

    const user: User = await userRepository.save(validData);
    const message = await userCreateSerializedSchema.validate(user, {
      stripUnknown: true,
    });

    return {
      status: 201,
      message: message,
    };
  };
}

export default new UserService();
