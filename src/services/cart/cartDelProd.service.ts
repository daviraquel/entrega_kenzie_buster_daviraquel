import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { fixedFloat } from "../../utils";

const cartDelProdService = async (productId: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email: userEmail } });

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });

  if (!cart || !user) {
    throw new AppError(404, "user not found");
  }

  if (cart.products.filter((item) => item.id === productId)) {
    throw new AppError(404, "product not in the cart");
  }

  cart.products = cart.products.filter((item) => item.id !== productId);
  cart.subtotal = fixedFloat(
    cart.products.reduce((acc, prod) => acc + prod.price, 0)
  );

  await cartRepository.save(cart);

  return { status: 200, message: "" };
};

export default cartDelProdService;
