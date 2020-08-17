import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { authenticate } from 'passport';
import { hashSync } from 'bcryptjs';

import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { RegisterInput } from '../Inputs/RegisterInput';
import { User } from '../Models/User';
import { UserInterface } from '../../types/UserInterface';
import { LoginInput } from '../Inputs/LoginInput';
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

      return res.status(400).json({ error: { message: 'VALIDATIONS_ERROR', info: errorsInfo } });
    }

    // check if user exists for same email or not

    const user = await User.findOne({ email: input.email });

    if (user) {
      return res.status(409).json({ error: { message: 'User alreay exists.' } });
    }

    const hashPassword = hashSync(input.password, process.env.APP_SECRET as string);

    // creating new user
    const newUser = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashPassword,
      infusionSoftId: input.infusionSoftId,
      role: RolesEnum.USER,
    } as UserInterface);
 
    if(newUser) {
      await sendMail('registration', newUser.email, newUser, 'Registration Successfull');

      return res.json({ data: { message: 'Account created successfully.' } });
    }

    return res.json({ error: { message: 'Something went wrong.' } });

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

      return res.status(400).json({ error: { message: 'VALIDATIONS_ERROR', info: { errorsInfo } } });
    }

    return authenticate('local', { session: false }, (err: any, user: UserInterface, message: Object) => {
      if (!user) {
        if(err) {
          return res.status(400).json({ error: err });
        }

        return res.status(401).json({ error: message });
      }

      const token = generateAuthToken(user);

      return res.json({
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