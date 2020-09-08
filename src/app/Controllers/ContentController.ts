import { Request, Response } from "express";
import { validate } from "class-validator";
import { Types } from "mongoose";

import { ContentInput } from "../Inputs/ContentInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";
import { ContentTypeEnum } from "../../types/ContentTypeEnum";
import { Post, SubCategory, Content } from "../Models/Content";
import { PostInput } from "../Inputs/PostInput";
import { SubCategoryPost } from "../../types/SubCategoryInterface";

export class ContentController {
  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ContentInput = req.body;

    const contentInput = new ContentInput();

    contentInput.title = input.title;
    contentInput.description = input.description;
    contentInput.categoryId = input.categoryId;
    contentInput.contentType = input.contentType;
    contentInput.body = input.body;
    contentInput.status = input.status;

    const errors = await validate(contentInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      if (input.contentType === ContentTypeEnum.POST) {
        await Post.create({
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          body: input.body,
          status: input.status,
          kind: ContentTypeEnum.POST,
        });

        return res.json({ message: "Post created successfully" });
      }

      await SubCategory.create({
        title: input.title,
        description: input.description,
        categoryId: input.categoryId,
        kind: ContentTypeEnum.SUB_CATEGORY,
        posts: [],
      });

      return res.json({ message: "Sub category created successfully." });
    } catch (error) {
      return res.status(500).json({
        message: `Cannot create ${input.contentType}. Something went wrong.`,
      });
    }
  };

  static details = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const content = await Content.findById(id);

      if (!content) {
        return res.status(404).json({ message: "Content not found." });
      }

      return res.json({ data: { content } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot fetch details. Something went wrong." });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    const input: ContentInput = req.body;

    const contentInput = new ContentInput();

    contentInput.title = input.title;
    contentInput.description = input.description;
    contentInput.categoryId = input.categoryId;
    contentInput.contentType = input.contentType;
    contentInput.body = input.body;
    contentInput.status = input.status;

    const errors = await validate(contentInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      if (input.contentType === ContentTypeEnum.POST) {
        const post = await Post.findByIdAndUpdate(
          id,
          {
            title: input.title,
            description: input.description,
            categoryId: input.categoryId,
            body: input.body,
            status: input.status,
          },
          {
            new: true,
          }
        );

        if (!post) {
          return res
            .status(404)
            .json({ message: "Post to update does not exists" });
        }

        return res.json({ message: "Post updated successfully" });
      }

      const subCategory = await SubCategory.findByIdAndUpdate(
        id,
        {
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
        },
        {
          new: true,
        }
      );

      if (!subCategory) {
        return res
          .status(404)
          .json({ message: "Sub Category to update does not exists." });
      }

      return res.json({ message: "Sub category updated successfully." });
    } catch (error) {
      return res.status(500).json({
        message: `Cannot create ${input.contentType}. Something went wrong.`,
      });
    }
  };

  static savePostToSubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    const input: PostInput = req.body;

    const postInput = new PostInput();

    postInput.title = input.title;
    postInput.description = input.description;
    postInput.body = input.body;
    postInput.status = input.status;

    const errors = await validate(postInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      const subCategory = await SubCategory.findByIdAndUpdate(
        id,
        {
          $push: {
            posts: {
              title: input.title,
              description: input.description,
              body: input.body,
              status: input.status,
            },
          },
        },
        {
          new: true,
        }
      );

      if (!subCategory) {
        return res
          .status(404)
          .json({ message: "Sub Category to add post does not exists." });
      }

      return res.json({
        message: "Post created succesfully in sub category",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot save post. Something went wrong." });
    }
  };

  static getPostFromSubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {
      id,
      postId,
    }: {
      id?: Types.ObjectId;
      postId?: Types.ObjectId;
    } = req.params;

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

  static updatePostFromSubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {
      id,
      postId,
    }: { id?: Types.ObjectId; postId?: Types.ObjectId } = req.params;

    const input: PostInput = req.body;

    const postInput = new PostInput();

    postInput.title = input.title;
    postInput.description = input.description;
    postInput.body = input.body;
    postInput.status = input.status;

    const errors = await validate(postInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      const post = await SubCategory.findOneAndUpdate(
        {
          _id: id,
          "posts._id": postId,
        },
        {
          "posts.$.title": input.title,
          "posts.$.description": input.description,
          "posts.$.body": input.body,
          "posts.$.status": input.status,
        },
        {
          new: true,
        }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post to update does not exists" });
      }

      return res.json({ message: "Post updated successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot update post. Something went wrong." });
    }
  };

  static destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Types.ObjectId } = req.params;

    try {
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post to delete does not exists" });
      }

      return res.json({ message: "Post deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot delete post. Something went wrong." });
    }
  };

  static destroyPostFromSubCategory = async (req: Request, res: Response) => {
    const {
      id,
      postId,
    }: { id?: Types.ObjectId; postId?: Types.ObjectId } = req.params;

    try {
      const post = await SubCategory.findOneAndUpdate(
        {
          _id: id,
          "posts._id": postId,
        },
        {
          $pull: { posts: { _id: postId } },
        },
        {
          new: true,
        }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post to delete does not exists" });
      }

      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Cannot delete post. Something went wrong." });
    }
  };
}
