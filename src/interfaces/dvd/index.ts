import { Dvd } from "../../entities";

export interface IDvdReposiory {
  save: (dvd: Partial<Dvd>) => Promise<Dvd>;
  findAll: () => Promise<Dvd[]>;
  findOne: (dvdInfo: object) => Promise<Dvd>;
}

export interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}
