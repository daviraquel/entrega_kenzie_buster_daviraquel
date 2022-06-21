import { Dvd, User } from "../entities";
import { IDvdCreate } from "../interfaces/dvd";

declare global {
  namespace Express {
    interface Request {
      userData: User;
      validData: User;
      quantity: number;
      dvdData: Dvd;
      dvds: IDvdCreate[];
    }
  }
}
