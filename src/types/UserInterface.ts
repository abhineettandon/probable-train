import { Document, Types } from "mongoose";

import { RolesEnum } from "./RolesEnum";

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RolesEnum;
  infusionSoftId: string;
  lastLogin: Date;
}
