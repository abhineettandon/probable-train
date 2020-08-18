import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { ProductCategory } from '../Models/ProductCategory';
import { ProductCategoryInput } from '../Inputs/ProductCategoryInput';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';

export class ProductCategoryController {
  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ProductCategoryInput = req.body;

    const productCategoryInput = new ProductCategoryInput();

    productCategoryInput.title = input.title;
    productCategoryInput.description = input.description;
    productCategoryInput.productId = input.productId;
    productCategoryInput.status = input.status;
    productCategoryInput.tags = input.tags;
    productCategoryInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productCategoryInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {
      await ProductCategory.create({
        title: input.title,
        description: input.description,
        productId: input.productId,
        status: input.status,
        tags: input.tags,
        lockedPageContent: input.lockedPageContent,
      });

      return res.json({ message: "Product category created successfully." })

    } catch (err) {
      return res.status(500).json({ message: 'Cannot cretae product category. Something went wrong!' })
    }
  }

  static show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;;

    try {

      const category = await ProductCategory.findById(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found.' })
      }

      return res.json({ data: { category } });

    } catch (err) {
      return res.status(500).json({ message: 'Cannot query category. Something went wrong!' })
    }

  }

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const input: ProductCategoryInput = req.body;

    const productCategoryInput = new ProductCategoryInput();

    productCategoryInput.title = input.title;
    productCategoryInput.description = input.description;
    productCategoryInput.productId = input.productId;
    productCategoryInput.status = input.status;
    productCategoryInput.tags = input.tags;
    productCategoryInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productCategoryInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {

      const category = await ProductCategory.findByIdAndUpdate(
        id,
        {
          title: input.title,
          description: input.description,
          productId: input.productId,
          status: input.status,
          tags: input.tags,
          lockedPageContent: input.lockedPageContent,
        },
        {
          new: true,
        }
      );

      if (!category) {
        return res.status(404).json({ message: 'Category to update does not exists' });
      }

      return res.json({ message: 'Category updated successfully.' })

    } catch (err) {
      return res.status(500).json({ message: 'Cannot update category. Something went wrong!' })
    }
  }
}
