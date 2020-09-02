import { Request, Response } from "express";
import { validate } from "class-validator";

import { ProductCategory } from "../Models/ProductCategory";
import { ProductCategoryInput } from "../Inputs/ProductCategoryInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";

export class ProductCategoryController {
  static list = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const productCategories = await ProductCategory.find({});

      return res.json({ data: { productCategories } });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot query product categories. Something went wrong.",
      });
    }
  };

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ProductCategoryInput = req.body;

    const productCategoryInput = new ProductCategoryInput();

    productCategoryInput.title = input.title;

    const errors = await validate(productCategoryInput);

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
      await ProductCategory.create({
        title: input.title,
      });

      return res.json({
        message: "Product category created successfully. ",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot create product category. Something went wrong.",
      });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const input: ProductCategoryInput = req.body;

    const productCategoryInput = new ProductCategoryInput();

    productCategoryInput.title = input.title;

    const errors = await validate(productCategoryInput);

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
      const productCategory = await ProductCategory.findByIdAndUpdate(
        id,
        {
          title: input.title,
        },
        {
          new: true,
        }
      );

      if (!productCategory) {
        return res
          .status(404)
          .json({ message: "Product category to update does not exists." });
      }

      return res.json({ message: "Product category updated successfully." });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot update product category. Something went wrong.",
      });
    }
  };
}
