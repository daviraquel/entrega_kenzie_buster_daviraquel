import { Stock } from "../../entities";

export interface IStockRepository {
  save: (dvd: Partial<Stock>) => Promise<Stock>;
}
