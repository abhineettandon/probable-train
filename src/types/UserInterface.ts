import { Document } from 'mongoose';

import { RolesEnum } from './RolesEnum';

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RolesEnum;
  infusionSoftId: string;
}
