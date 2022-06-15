import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.userEmail = decoded.email;
        next();
      }
    );
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
};

export default authUserMiddleware;