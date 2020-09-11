import { Request, Response } from "express";
import { Types } from "mongoose";

import { Group } from "../Models/Group";
import { Product } from "../Models/Product";
import { Category } from "../Models/Category";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";
import { Content } from "../Models/Content";

export class FrontendController {
  static getGroups = async (req: Request, res: Response): Promise<Response> => {
    try {
      const groups = await Group.find({});

      return res.json({ data: { groups } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get groups. Something went wrong." });
    }
  };

  static getProducts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const products = await Product.find({
        groupId: id,
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
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get products. Something went wrong." });
    }
  };

  static getCategories = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const categories = await Category.find({
        productId: id,
        $or: [
          {
            status: VisibilityStatus.LOCKED,
          },
          {
            status: VisibilityStatus.PUBLISHED,
          },
        ],
      });

      return res.json({ data: { categories } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get categories. Something went wrong." });
    }
  };

  static getContents = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const contents = await Content.find({
        _id: id,
        status: VisibilityStatus.PUBLISHED,
      });

      return res.json({ data: { contents } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get contents. Something went wrong." });
    }
  };
}
