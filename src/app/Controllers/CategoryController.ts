import { Request, Response } from "express";
import { Schema } from "mongoose";

import { Category } from "../Models/Category";
import { CategoryInterface } from "../../types/CategoryInterface";
import { CategoryInput } from "../Inputs/CategoryInput";
import { ValidationError, validate } from "class-validator";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";

export class CategoryConroller {
  static list = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const categories: CategoryInterface[] = await Category.find({});

      return res.json({ data: { categories } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot get categories. Something went wrong" });
    }
  };

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: CategoryInput = req.body;

    const categoryInput: CategoryInput = new CategoryInput();

    categoryInput.title = input.title;
    categoryInput.description = input.description;
    categoryInput.productId = input.productId;
    categoryInput.parentCategoryId = input.parentCategoryId;
    categoryInput.status = input.status;
    categoryInput.tags = input.tags;
    categoryInput.lockedPageContent = input.lockedPageContent;

    const errors: ValidationError[] = await validate(categoryInput);

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
      await Category.create({
        title: input.title,
        description: input.description,
        productId: input.productId,
        parentCategoryId: input.parentCategoryId
          ? input.parentCategoryId
          : null,
        status: input.status,
        tags: input.tags,
        lockedPageContent: input.lockedPageContent,
      });

      return res.json({ message: "Category created sucessfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot create category. Something went wrong" });
    }
  };

  static details = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Schema.Types.ObjectId } = req.params;

    try {
      const category: CategoryInterface | null = await Category.findById(
        id
      ).populate("parentCategoryId", "title");

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.json({ data: { category } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot query category. Something went wrong." });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: Schema.Types.ObjectId } = req.params;

    const input: CategoryInput = req.body;

    const categoryInput: CategoryInput = new CategoryInput();

    categoryInput.title = input.title;
    categoryInput.description = input.description;
    categoryInput.productId = input.productId;
    categoryInput.parentCategoryId = input.parentCategoryId;
    categoryInput.status = input.status;
    categoryInput.tags = input.tags;
    categoryInput.lockedPageContent = input.lockedPageContent;

    const errors: ValidationError[] = await validate(categoryInput);

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
      const category: CategoryInterface | null = await Category.findByIdAndUpdate(
        id,
        {
          title: input.title,
          description: input.description,
          productId: input.productId,
          parentCategoryId: input.parentCategoryId
            ? input.parentCategoryId
            : null,
          status: input.status,
          tags: input.tags,
          lockedPageContent: input.lockedPageContent,
        },
        {
          new: true,
        }
      );

      if (!category) {
        return res
          .status(404)
          .json({ message: "Category to update does not exists" });
      }

      return res.json({ message: "Category updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot update category. Something went wrong" });
    }
  };
}
