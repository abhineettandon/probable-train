import { Request, Response } from 'express';
import { Schema } from 'mongoose';

import { Product } from '../Models/Product';
import { ProductInput } from '../Inputs/ProductInput';
import { validate } from 'class-validator';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { ProductCategory } from '../Models/ProductCategory';

export class ProductController {
  static index = async (_req: Request, res: Response): Promise<Response> => {
    const products = await Product.find({}).populate('productTypeId', 'title');

    return res.json({ data: { products } });
  }

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ProductInput = req.body;

    const productInput = new ProductInput();

    productInput.title = input.title;
    productInput.description = input.description;
    productInput.productTypeId = input.productTypeId;
    productInput.status = input.status;
    productInput.tags = input.tags;
    productInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {
      await Product.create({
        title: input.title,
        description: input.description,
        productTypeId: input.productTypeId,
        status: input.status,
        tags: input.tags,
        lockedPageContent: input.lockedPageContent,
      });

      return res.json({ data: { message: 'Product Created Successfully' } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Cannot create product. Something went wrong!' } });
    }

  }
  
  static show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {

      const product = await Product.findById(id);

      if(!product) {
        return res.status(404).json({ error: { message: 'Product not found' } });
      }

      return res.json({ data: { product } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Cannot find product. Something went wrong!' } })
    }
  }

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const input: ProductInput = req.body;

    const productInput = new ProductInput();

    productInput.title = input.title;
    productInput.description = input.description;
    productInput.productTypeId = input.productTypeId;
    productInput.status = input.status;
    productInput.tags = input.tags;
    productInput.lockedPageContent = input.lockedPageContent;

    const errors = await validate(productInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {

      const product = await Product.findByIdAndUpdate(
        id,
        {
          title: input.title,
          description: input.description,
          productTypeId: input.productTypeId,
          status: input.status,
          tags: input.tags,
          lockedPageContent: input.lockedPageContent,
        },
        {
          new: true,
        }
      );

      if (!product) {
        return res.status(404).json({ error: { message: "Product to update does not exists." } })
      }
        
      return res.json({ data: { message: 'Product updated successfully' } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Cannot update product. Something went wrong!' } })
    }

  }

  static getCategories = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const productCategories = await ProductCategory.find({
        productId: id as unknown as Schema.Types.ObjectId,
      });

      return res.json({ data: { productCategories } });

    } catch (err) {
      return res.status(500).json({ message: 'Cannot query product categories. Something went wrong!' })
    }
  }
}
