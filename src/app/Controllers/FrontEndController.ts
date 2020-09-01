import { Request, Response } from "express";

import { Product } from "../Models/Product";
import { ProductCategory } from "../Models/ProductCategory";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";
import { Schema } from "mongoose";

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

  static getCategories = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const categories = await ProductCategory.find({
        productId: (id as unknown) as Schema.Types.ObjectId,
        $or: [
          {
            status: VisibilityStatus.PUBLISHED,
          },
          {
            status: VisibilityStatus.LOCKED,
          },
        ],
      });

      return res.json({ data: { categories } });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Cannot query categories. Something went wrong." });
    }
  };
}
