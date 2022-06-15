import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userDeleteSelfService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const account = users.find((user) => user.email === email);

  await userRepository.delete(account!.id);

  return { status: 200, message: "user deleted" };
};

export default userDeleteSelfService;
