import { DataSource } from "typeorm";
import request from "supertest";

import { AppDataSource } from "../../data-source";
import app from "../../app";

describe("Testing user routes", () => {
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

  test("Should be able to create new user", async () => {
    const name = "name";
    const email = "mail@mail.com";
    const password = "password";
    const userData = { name, email, password };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email,
        name,
        cart: expect.objectContaining({ subtotal: 0 }),
      })
    );
  });

  test("Should return a list with all registered users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("map");
  });
});
