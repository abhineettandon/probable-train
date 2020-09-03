import { Request, Response } from "express";

import { Product } from "../Models/Product";
import { ProductInput } from "../Inputs/ProductInput";
import { validate } from "class-validator";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";

export class ProductsController {
  static list = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const products = await Product.find({}).populate("groupId", "title");

      return res.json({ data: { products } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot query products. Something went wrong." });
    }
  };

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ProductInput = req.body;

    const productInput = new ProductInput();

    productInput.title = input.title;
    productInput.description = input.description;
    productInput.groupId = input.groupId;
    productInput.status = input.status;
    productInput.tags = input.tags;
    productInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productInput);

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
      await Product.create({
        title: input.title,
        description: input.description,
        groupId: input.groupId,
        status: input.status,
        tags: input.tags,
        lockedPageContent: input.lockedPageContent,
      });

      return res.json({ message: "Product created successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Cannot create product. Something went wrong.",
      });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const input: ProductInput = req.body;

    const productInput = new ProductInput();

    productInput.title = input.title;
    productInput.description = input.description;
    productInput.groupId = input.groupId;
    productInput.status = input.status;
    productInput.tags = input.tags;
    productInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATION_ERROR", info: errorsInfo } });
    }

    try {
      const product = await Product.findByIdAndUpdate(
        id,
        {
          title: input.title,
          description: input.description,
          groupId: input.groupId,
          status: input.status,
          tags: input.tags,
          lockedPageContent: input.lockedPageContent,
        },
        {
          new: true,
        }
      );

      if (!product) {
        return res
          .status(404)
          .json({ error: { message: "Product to update does not exists." } });
      }

      return res.json({ data: { message: "Product updated successfully" } });
    } catch (err) {
      return res.status(500).json({
        error: { message: "Cannot update product. Something went wrong!" },
      });
    }
  };
}
