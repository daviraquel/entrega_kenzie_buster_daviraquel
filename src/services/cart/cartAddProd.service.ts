import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { fixedFloat } from "../../utils";

const cartAddProdService = async (productId: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email: userEmail } });

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });

  if (!cart || !user) {
    throw new AppError(404, "user not found");
  }

  const productRepository = AppDataSource.getRepository(Product);
  const productToAdd = await productRepository.findOne({
    where: { id: productId },
  });

  if (!productToAdd) {
    throw new AppError(404, "product not found");
  }

  if (
    cart.products.filter((item) => item.name === productToAdd.name).length > 0
  ) {
    throw new AppError(409, "product already in the cart");
  }

  cart.products = [...cart.products, productToAdd];
  cart.subtotal = fixedFloat(cart.subtotal + productToAdd.price);

  await cartRepository.save(cart);

  return { status: 200, message: cart };
};

export default cartAddProdService;
