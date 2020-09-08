import { Request, Response } from "express";
import { validate } from "class-validator";
import { Schema } from "mongoose";

import { ContentInput } from "../Inputs/ContentInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";
import { ContentTypeEnum } from "../../types/ContentTypeEnum";
import { Post, SubCategory, Content } from "../Models/Content";

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
    const { id }: { id?: Schema.Types.ObjectId } = req.params;

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
    const { id }: { id?: Schema.Types.ObjectId } = req.params;

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
}
