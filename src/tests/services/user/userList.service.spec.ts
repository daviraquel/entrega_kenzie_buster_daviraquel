import { DataSource } from "typeorm";

import { AppDataSource } from "../../../data-source";
import userListService from "../../../services/users/userList.service";

describe("List all users", () => {
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

  test("Should list all registered users", async () => {
    const { status, message } = await userListService();

    expect(status).toEqual(200);
    expect(message).toHaveProperty("map");
  });
});
