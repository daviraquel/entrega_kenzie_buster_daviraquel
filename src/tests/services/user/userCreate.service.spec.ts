import { DataSource } from "typeorm";

import { AppDataSource } from "../../../data-source";
import userCreateService from "../../../services/users/userCreate.service";

describe("Create an user", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during data source initialization");
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should insert new user info in the database", async () => {
    const email = "mail@mail.com";
    const name = "name";
    const password = "password";
    const userData = { email, name, password };

    const { status, message } = await userCreateService(userData);

    expect(status).toEqual(201);
    expect(message).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email,
        name,
        password: expect.any(String),
        cart: expect.objectContaining({ subtotal: 0 }),
      })
    );
  });
});
