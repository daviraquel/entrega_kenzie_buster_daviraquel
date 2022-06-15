import { Buy } from "../../entities/buy.entity";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const buyCreateService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email: userEmail } });

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });

  if (!user || !cart) {
    throw new AppError(404, "user not found");
  }

  if (cart.products.length === 0) {
    throw new AppError(400, "cart is empty");
  }

  const buy = new Buy();
  buy.user = user;
  buy.products = cart.products;
  buy.total = cart.subtotal;

  const buyRepository = AppDataSource.getRepository(Buy);
  buyRepository.create(buy);
  await buyRepository.save(buy);

  cart.products = [];
  cart.subtotal = 0;
  await cartRepository.save(cart);

  const newBuy = buyRepository.findOne({ where: { id: buy.id } });

  return { status: 201, message: newBuy };
};

export default buyCreateService;
