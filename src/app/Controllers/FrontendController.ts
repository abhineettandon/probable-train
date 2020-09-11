import { Request, Response } from "express";
import { Types } from "mongoose";

import { Group } from "../Models/Group";
import { Product } from "../Models/Product";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

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
}
