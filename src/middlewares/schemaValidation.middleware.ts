import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const schemaValidation =
  (shape: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validData = await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (req.body.dvds) {
        req.dvds = validData.dvds;
      } else if (req.body.quantity) {
        req.quantity = validData.quantity;
      } else {
        req.validData = validData;
      }

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };

export default schemaValidation;
