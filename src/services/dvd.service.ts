import { Request } from "express";
import {
  dvdRepository,
  stockRepository,
  cartRepository,
} from "../repositories";
import * as dotenv from "dotenv";
import { Stock, Dvd } from "../entities";

dotenv.config();

class DvdService {
  createDvds = async ({ dvds }: Request) => {
    let message: Dvd[] = [];
    for (let i = 0; i < dvds.length; i++) {
      let newDvd = new Dvd();
      newDvd.duration = dvds[i].duration;
      newDvd.name = dvds[i].name;

      let newStock = new Stock();
      newDvd.stock = newStock;
      newStock.price = dvds[i].price;
      newStock.quantity = dvds[i].quantity;

      await stockRepository.save(newStock);
      await dvdRepository.save(newDvd);
      message.push(newDvd);
    }

    return {
      status: 201,
      message: message,
    };
  };

  listDvds = async () => {
    const dvds: Dvd[] = await dvdRepository.findAll();
    const message = dvds;

    return {
      status: 200,
      message: message,
    };
  };

  buyDvd = async (req: Request) => {
    const cart = await cartRepository.findOne({
      user: { id: req.userData.id },
    });
    cart.total = req.dvdData.stock.price * req.quantity;
    cart.dvd = req.dvdData;
    await cartRepository.save(cart);

    return {
      status: 201,
      message: cart,
    };
  };
}

export default new DvdService();
