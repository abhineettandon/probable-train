import { Request, Response } from "express";
import { validate } from "class-validator";

import { ContentInput } from "../Inputs/ContentInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";
import { ContentTypeEnum } from "../../types/ContentTypeEnum";
import { Post, SubCategory } from "../Models/Content";

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

    if (input.contentType === ContentTypeEnum.POST) {
      contentInput.body = input.body;
      contentInput.status = input.status;
    }

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
}
