import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { compareSync, hashSync } from 'bcryptjs';

import { ChangePasswordInput } from '../Inputs/ChangePasswordInput';
import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { User } from '../Models/User';

export class ProfileController {
  static changePassword = async (req: Request, res: Response): Promise<Response> => {
    const input: ChangePasswordInput = req.body;

    const { id } = req.user;

    const changePasswordInput = new ChangePasswordInput();

    changePasswordInput.currentPassword = input.currentPassword;
    changePasswordInput.newPassword = input.newPassword;
    
    const errors = await validate(changePasswordInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ error: { message: 'VALIDATION_ERROR', info: { errorsInfo } } });
    }

    try {
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: { message: 'User to update does not exists.' } });
      }

      if(!compareSync(input.currentPassword, user.password)) {
        return res.status(400).json({ error: { message: 'Invalid current password' } });
      }

      user.password = hashSync(input.newPassword, process.env.APP_SECRET as string);;

      await user.save();
      
      // todo: send password rest mail to user
      return res.json({ data: { message: 'Password reset successfully.' } })

    } catch (error) {
      return res.status(500).json({ error: { message: 'Something went wrong.' } })
    }
  }
}
