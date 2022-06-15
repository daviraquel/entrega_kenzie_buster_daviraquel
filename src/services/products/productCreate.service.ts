import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";
import { IProductCreate } from "../../interfaces/products";

const productCreateService = async ({
  name,
  description,
  price,
}: IProductCreate) => {
  const productRepository = AppDataSource.getRepository(Product);

  const productAlreadyExists = await productRepository.findOne({
    where: { name },
  });

  if (productAlreadyExists) {
    throw new AppError(409, "Product already registered");
  }

  const newProduct = new Product();
  newProduct.name = name;
  newProduct.description = description;
  newProduct.price = price;

  productRepository.create(newProduct);
  productRepository.save(newProduct);

  return { status: 201, message: newProduct };
};

export default productCreateService;
