import { Request, Response } from 'express';

import { User } from '../Models/User';
import { UpdateUserInput } from '../Inputs/UpdateUserInput';
import { validate } from 'class-validator';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';

export class UsersControllers {
  static index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await User.find(
        {},
        '-password -__v',
        { sort: 'createdAt desc' }
      );

      return res.json({ data: { users } });
    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong.' } });  
    }
  }

  static show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const user = await User.findById(id, '-password -__v');
      
      if(user) {
        return res.json({ data: { user } }); 
      }

      return res.status(404).json({ error: { message: 'User not found.' } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong.' } });  
    }
  }

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const input: UpdateUserInput = req.body;

    const updateInput = new UpdateUserInput();

    updateInput.firstName = input.firstName;
    updateInput.lastName = input.lastName;
    updateInput.role = input.role;

    const errors = await validate(updateInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: { errorsInfo } } });
    }

    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName: input.firstName,
          lastName: input.lastName,
          role: input.role,
        },
        {
          new: true,
        }
      );
      
      if (!user) {
        return res.status(404).json({ error: { message: 'User to update does not exists.' } });
      }

      return res.json({ data: { user } })
    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong.' } });
    }
  }

  static destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ error: { message: 'User to delete does not exists.' } });
      } 

      return res.json({ data: { message: 'User deleted successfully.' } });
    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong.' } });
    }
  }
}
