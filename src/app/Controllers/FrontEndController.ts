import { Request, Response } from "express";

import { Product } from "../Models/Product";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

export class FrontEndController {
  static getProducts = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const products = await Product.find({
        $or: [
          {
            status: VisibilityStatus.PUBLISHED,
          },
          {
            status: VisibilityStatus.LOCKED,
          },
        ],
      });

      return res.json({ data: { products } });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Cannot get products. Something went wrong." });
    }
  };
}
