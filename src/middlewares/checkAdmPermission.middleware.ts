import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const checkAdmPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "missing authorization token" });
    }

    const token = req.headers.authorization;
    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        req.userData = decoded;
        if (err) {
          return res.status(401).json({ error: err });
        }
      }
    );

    if (!req.userData.isAdm) {
      return res.status(401).json({ error: "missing admin permision" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export default checkAdmPermission;
