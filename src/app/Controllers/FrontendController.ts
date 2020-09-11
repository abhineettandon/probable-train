import { Request, Response } from "express";
import { Types } from "mongoose";

import { Group } from "../Models/Group";
import { Product } from "../Models/Product";
import { Category } from "../Models/Category";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";
import { Content, Post, SubCategory } from "../Models/Content";
import { SubCategoryPost } from "../../types/SubCategoryInterface";

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
      const contents = await Content.find(
        {
          categoryId: id,
          status: VisibilityStatus.PUBLISHED,
        },
        "title description posts._id posts.title posts.description"
      );

      return res.json({ data: { contents } });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Cannot get contents. Something went wrong." });
    }
  };

  static getPost = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.json({ data: { post } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get post. Something went wrong" });
    }
  };

  static getSubCategoryPost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {
      id,
      postId,
    }: { id?: Types.ObjectId; postId?: Types.ObjectId } = req.params;

    try {
      const subCategory = await SubCategory.findOne({
        _id: id,
        "posts._id": postId,
      });

      if (!subCategory) {
        return res.status(404).json({ message: "Post not found." });
      }

      const post: SubCategoryPost = subCategory.posts.filter((post) =>
        post._id.equals(postId as Types.ObjectId)
      )[0];

      return res.json({ data: { post } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot fetch post. Something went wrong" });
    }
  };
}
