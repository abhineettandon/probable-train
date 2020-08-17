import { Request, Response } from 'express';

import { ProductType } from '../Models/ProductType';
import { ProductTypeInterface } from '../../types/ProductTypeInterface';
import { ProductTypeInput } from '../Inputs/ProductTypeInput';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { validate } from 'class-validator';

export class ProductTypesController {
  static index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productTypes = await ProductType.find({})

      return res.json({ data: { productTypes } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong!' } });
    }
  }

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: ProductTypeInterface = req.body;

    const createProductInput = new ProductTypeInput();

    createProductInput.title = input.title;

    const errors = await validate(createProductInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {
      await ProductType.create({
        title: input.title
      });

      return res.send({ message: 'Product Type created successfully' });
    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong!' }});
    }
  }

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    const input: ProductTypeInput = req.body;

    const productTypeInput = new ProductTypeInput();
    
    productTypeInput.title = input.title;

    const errors = await validate(productTypeInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {
      const productType = await ProductType.findByIdAndUpdate(
        id,
        {
          title: input.title
        },
        {
          new: true,
        }
      );

      if (!productType) {
        return res.status(404).json({ error: { message: "Product Type to update does not exists." } })
      }
        
      return res.json({ data: { message: 'Product Type updated successfully' } });
    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong!' } });
    }
  }
}
