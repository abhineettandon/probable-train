import { Request, Response } from 'express';

import { ProductType } from '../Models/ProductType';

export class ProductTypesController {
  static index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productTypes = await ProductType.find({})

      return res.json({ data: { productTypes } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong!' } });
    }
  }
}
