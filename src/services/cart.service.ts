import { Request } from "express";
import { cartRepository } from "../repositories";
import * as dotenv from "dotenv";

dotenv.config();

class CartService {
  payCart = async (req: Request) => {
    const cart = await cartRepository.findOne({
      user: { id: req.userData.id },
    });
    cart.paid = true;
    const message = {
      id: cart.id,
      paid: cart.paid,
      total: cart.total,
      dvd: {
        id: cart.dvd.id,
        name: cart.dvd.name,
        duration: cart.dvd.duration,
      },
    };
    cart.dvd = null;
    cart.total = 0;
    cart.paid = false;
    await cartRepository.save(cart);

    return {
      status: 200,
      message: { cart: message },
    };
    // EXEMPLO ATIVIDADE
    //
    // STATUS 200
    // {
    //     "cart": [
    //         {
    //             "id": "b585c045-3082-4cdc-bc62-39368bbff4a3",
    //             "paid": true,
    //             "total": 43.96,
    //             "dvd": {
    //                 "id": "a63c1eb7-5201-49fa-a7cf-55d13e7f2a64",
    //                 "name": "duro de matar 2",
    //                 "duration": "2h4min"
    //             }
    //         }
    //     ]
    // }
  };
}

export default new CartService();
