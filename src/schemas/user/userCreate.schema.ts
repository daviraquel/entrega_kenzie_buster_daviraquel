import * as yup from "yup";

const userCreateSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  name: yup.string().required(),
  isAdm: yup.boolean().default(false).optional(),
  password: yup.string().required(),
});

const userCreateSerializedSchema = yup.object().shape({
  isAdm: yup.boolean().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  id: yup.string().uuid().required(),
});

export { userCreateSchema, userCreateSerializedSchema };
