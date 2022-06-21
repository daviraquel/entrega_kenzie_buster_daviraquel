import { Request, Response } from "express";
import { dvdService } from "../services";

class DvdController {
  createDvds = async (req: Request, res: Response) => {
    const { status, message } = await dvdService.createDvds(req);

    return res.status(status).json(message);
  };

  listDvds = async (req: Request, res: Response) => {
    const { status, message } = await dvdService.listDvds();

    return res.status(status).json(message);
  };

  buyDvd = async (req: Request, res: Response) => {
    const { status, message } = await dvdService.buyDvd(req);

    return res.status(status).json(message);
  };
}

export default new DvdController();
