import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Dvd } from "../entities/dvd.entity";
import { IDvdReposiory } from "../interfaces/dvd";

class DvdReposiory implements IDvdReposiory {
  private repo: Repository<Dvd>;

  constructor() {
    this.repo = AppDataSource.getRepository(Dvd);
  }

  save = async (dvd: Partial<Dvd>) => await this.repo.save(dvd);

  findAll = async () => await this.repo.find();

  findOne = async (dvdInfo: object) => {
    return await this.repo.findOneBy({ ...dvdInfo });
  };
}

export default new DvdReposiory();
