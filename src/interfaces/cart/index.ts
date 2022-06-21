import { Cart } from "../../entities";

export interface ICartReposiory {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  findOne: (userInfo: object) => Promise<Cart>;
}
