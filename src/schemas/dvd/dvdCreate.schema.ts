import * as yup from "yup";

const dvdDataSchema = yup.object().shape({
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

const dvdCreateSchema = yup.object().shape({
  dvds: yup.array().of(dvdDataSchema).required(),
});

export default dvdCreateSchema;
