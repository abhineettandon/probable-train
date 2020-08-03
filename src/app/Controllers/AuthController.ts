import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { generate } from 'generate-password';
import { hashSync } from 'bcrypt';

import { ValidationErrorResponse } from '../../types/ValidationErrorResponse';
import { RegisterInput } from '../../types/Input/RegisterInput';
import { User } from '../Models/User';
import { UserInterface } from '../../types/UserInterface';

class AuthController {
  static regsiter = async (req: Request, res: Response): Promise<Response> => {
    const input: RegisterInput = req.body;

    const registerInput = new RegisterInput();
    
    registerInput.firstName = input.firstName;
    registerInput.lastName = input.lastName;
    registerInput.email = input.email;
    registerInput.infusionSoftId = input.infusionSoftId;
    registerInput.role = input.role;

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

    const password = generate({ length: 10, numbers: true });

    const hashedPassword = hashSync(password, process.env.APP_SECRET as string);

    // creating new user
    const newUser = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
      infusionSoftId: input.infusionSoftId,
      role: input.role,
    } as UserInterface);

    if(newUser) {
      console.log('new user', newUser);
      return res.json({ errors: [], data: newUser });
    }

    return res.json({ errors: [{ message: 'Something went wrong.' }], data: [] });

  }
}

export { AuthController };