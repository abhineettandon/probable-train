import { Request, Response } from 'express';
import { generate } from 'generate-password';
import { hashSync } from 'bcryptjs';

import { User } from '../Models/User';
import { UpdateUserInput } from '../Inputs/UpdateUserInput';
import { validate } from 'class-validator';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { sendMail } from '../../utils/sendMail';

export class UsersControllers {
  static index = async (_req: Request, res: Response): Promise<Response> => {
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

    const updateUserInput = new UpdateUserInput();

    updateUserInput.firstName = input.firstName;
    updateUserInput.lastName = input.lastName;
    updateUserInput.role = input.role;

    const errors = await validate(updateUserInput);

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

  static resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: { message: 'User to update does not exists.' }, data: { } });
      }

      const password = generate({ length: 10, numbers: true });

      user.password = hashSync(password, process.env.APP_SECRET as string);;
      await user.save();

      const mailVariables = {
        firstName: user.firstName,
        lastName: user.lastName,
        password: password,
      }

      await sendMail('reset-password-admin', user.email, mailVariables, 'Password Reset Successfully.');

      return res.json({ error: {}, data: { message: 'Password reset successfully.' } });

    } catch (err) {
      return res.status(500).json({ error: { message: 'Something went wrong.' }, data: {} })
    }
  }
}
