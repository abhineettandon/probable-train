import { Document } from 'mongoose';

export interface ProductTypeInterface extends Document{
  title: String,
  description?: String;
}
