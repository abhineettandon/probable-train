import { Request, Response } from "express";
import { validate } from "class-validator";

import { Category } from "../Models/Category";
import { CategoryInput } from "../Inputs/CategoryInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";

export class CategoriesController {
  static list = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const categories = await Category.find({});

      return res.json({ data: { categories } });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot query categories. Something went wrong.",
      });
    }
  };

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: CategoryInput = req.body;

    const categoryInput = new CategoryInput();

    categoryInput.title = input.title;

    const errors = await validate(categoryInput);

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
      });

      return res.json({
        message: "Category created successfully. ",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot create Category. Something went wrong.",
      });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const input: CategoryInput = req.body;

    const categoryInput = new CategoryInput();

    categoryInput.title = input.title;

    const errors = await validate(categoryInput);

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
      const category = await Category.findByIdAndUpdate(
        id,
        {
          title: input.title,
        },
        {
          new: true,
        }
      );

      if (!category) {
        return res
          .status(404)
          .json({ message: "Category to update does not exists." });
      }

      return res.json({ message: "Category updated successfully." });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot update Category. Something went wrong.",
      });
    }
  };
}
