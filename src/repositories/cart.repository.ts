import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Cart } from "../entities";
import { ICartReposiory } from "../interfaces/cart";

class CartReposiory implements ICartReposiory {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Partial<Cart>) => await this.repo.save(cart);

  findOne = async (userInfo: object) => {
    return await this.repo.findOneBy({ ...userInfo });
  };
}

export default new CartReposiory();
