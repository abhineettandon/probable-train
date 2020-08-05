import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { authenticate } from 'passport';

import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { RegisterInput } from '../../types/Input/RegisterInput';
import { User } from '../Models/User';
import { UserInterface } from '../../types/UserInterface';
import { LoginInput } from '../../types/Input/LoginInput';
import { RolesEnum } from '../../types/RolesEnum';
import { generateAuthToken } from '../../utils/jwt';
import { sendMail } from '../../utils/sendMail';

class AuthController {
  static regsiter = async (req: Request, res: Response): Promise<Response> => {
    const input: RegisterInput = req.body;

    const registerInput = new RegisterInput();
    
    registerInput.firstName = input.firstName;
    registerInput.lastName = input.lastName;
    registerInput.email = input.email;
    registerInput.password = input.password;
    registerInput.infusionSoftId = input.infusionSoftId;

    const errors = await validate(registerInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ errors: errorsInfo, data: [] });
    }

    // check if user exists for same email or not

    const user = await User.findOne({ email: input.email });
    console.log('user', user);

    if (user) {
      return res.status(409).json({ errors: [{ message: 'User alreay exists.' }], data: [] });
    }

    // creating new user
    const newUser = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      infusionSoftId: input.infusionSoftId,
      role: RolesEnum.USER,
    } as UserInterface);

    if(newUser) {
      await sendMail('registration', newUser.email, newUser, 'Registration Successfull');

      return res.json({ errors: [], data: newUser });
    }

    return res.json({ errors: [{ message: 'Something went wrong.' }], data: [] });

  }

  static login = async (req: Request, res: Response): Promise<Response> => {
    const input: LoginInput = req.body;

    const loginInput = new LoginInput();

    loginInput.email = input.email;
    loginInput.password = input.password;

    const errors = await validate(loginInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({ errors: errorsInfo, data: [] });
    }

    return authenticate('local', { session: false }, (err: any, user: UserInterface, message: Object) => {
      if (!user) {
        if(err) {
          return res.status(400).json({ errors: err, data: {} });
        }

        return res.status(401).json({ errors: { message }, data: {}});
      }

      const token = generateAuthToken(user);

      return res.json({
        errors: [],
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            infusionSoftId: user.infusionSoftId,
            role: user.role,
            lastLogin: user.lastLogin
          },
          token
        }
      });
    })(req, res);
  }
}

export { AuthController };