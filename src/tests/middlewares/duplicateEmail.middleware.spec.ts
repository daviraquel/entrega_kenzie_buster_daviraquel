import { DataSource } from "typeorm";
import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import duplicateEmail from "../../middlewares/duplicateEmail.middleware";
import { AppError } from "../../errors/appError";

describe("Checks if an eamil is already registered", () => {
  let mockRequest: Partial<Request> = {};
  let mockResponse: Partial<Response> = { status: jest.fn(), json: jest.fn() };
  let mockNextFunction = jest.fn() as NextFunction;

  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during data source initialization");
      });

    const userRepository = AppDataSource.getRepository(User);
    const cartRepository = AppDataSource.getRepository(Cart);

    const cart = new Cart();
    cart.subtotal = 0;
    cartRepository.create(cart);
    await cartRepository.save(cart);

    const mockUser = new User();
    mockUser.name = "name";
    mockUser.email = "mail@mail.com";
    mockUser.password = "password";
    mockUser.cart = cart;

    userRepository.create(mockUser);
    await userRepository.save(mockUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should return error if email is duplicate", async () => {
    const mockError = new AppError(409, "email already exists");

    mockRequest = {
      body: { name: "name", emai: "mail@mail.com", password: "password" },
    };

    await duplicateEmail(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toEqual(mockError.statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
