import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { CategotyContentInput } from '../Inputs/CategoryContentInput'
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { CategoryContent } from '../Models/CategoryContent';

export class CategoryContentController {
  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: CategotyContentInput = req.body;

    const categoryContentInput = new CategotyContentInput();

    categoryContentInput.title = input.title;
    categoryContentInput.description = input.description;
    categoryContentInput.categoryId = input.categoryId;
    categoryContentInput.body = input.body;
    categoryContentInput.status = input.status;

    const errors = await validate(categoryContentInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {

      await CategoryContent.create({
        title: input.title,
        description: input.description,
        categoryId: input.categoryId,
        body: input.body,
        status: input.status,
      });

      return res.json({ message: 'Content created successfully' })

    } catch (err) {
      return res.status(500).json({ message: 'Cannot save content. Something went wrong!' })
    }
  }

  static show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const content = await CategoryContent.findById(id);

      if(!content) {
        return res.status(404).json({ message: 'Content not found' });
      }

      return res.json({ data: { content } });

    } catch (err) {
      return res.status(500).json({ message: 'Cannot query content. Something went wrong!' });
    }
  }

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    const input: CategotyContentInput = req.body;

    const categoryContentInput = new CategotyContentInput();

    categoryContentInput.title = input.title;
    categoryContentInput.description = input.description;
    categoryContentInput.categoryId = input.categoryId;
    categoryContentInput.body = input.body;
    categoryContentInput.status = input.status;

    const errors = await validate(categoryContentInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: errorsInfo } });
    }

    try {
      const content = await CategoryContent.findByIdAndUpdate(
        id,
        {
          title: input.title,
          categoryId: input.categoryId,
          description: input.description,
          body: input.body,
          status: input.status,
        },
        {
          new: true,
        }
      );

      if(!content) {
        return res.status(404).json({ message: 'Content to update does not exists.' });
      }

      return res.json({ message: 'Content updated successfully.' });

    } catch (err) {
      return res.status(500).json({ message: 'Cannot update content. Something went wrong!' })
    }
  }

  static destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const content = await CategoryContent.findByIdAndDelete(id);

      if(!content) {
        return res.status(404).json({ message: 'Content to delete does not exists' });
      }

      return res.json({ message: 'Content deleted successfully' });

    } catch (err) {
      return res.status(500).json({ message: 'Cannot delete content. Something went wrong!' });
    }
  }
}
