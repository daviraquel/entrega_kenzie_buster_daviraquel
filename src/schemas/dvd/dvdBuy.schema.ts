import * as yup from "yup";

const dvdBuySchema = yup.object().shape({
  quantity: yup.number().integer().required(),
});

export default dvdBuySchema;
