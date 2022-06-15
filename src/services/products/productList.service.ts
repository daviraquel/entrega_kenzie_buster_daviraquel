import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const productListService = async () => {
  const productRepository = AppDataSource.getRepository(Product);
  const productList = await productRepository.find();

  return { status: 200, message: productList };
};

export default productListService;
