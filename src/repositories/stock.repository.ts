import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Stock } from "../entities";
import { IStockRepository } from "../interfaces/stock";

class DvdReposiory implements IStockRepository {
  private repo: Repository<Stock>;

  constructor() {
    this.repo = AppDataSource.getRepository(Stock);
  }

  save = async (stock: Partial<Stock>) => await this.repo.save(stock);
}

export default new DvdReposiory();
