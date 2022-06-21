import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserReposiory } from "../interfaces/users";

class UserReposiory implements IUserReposiory {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.repo.save(user);
  findAll = async () => await this.repo.find();

  findOne = async (userInfo: object) => {
    return await this.repo.findOneBy({ ...userInfo });
  };
}

export default new UserReposiory();
