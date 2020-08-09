import { model, Model } from 'mongoose';
import { hashSync } from 'bcryptjs';

import { UserInterface } from '../../types/UserInterface';
import { UserSchema } from '../../database/schema/UserSchema';

// UserSchema.pre('save', function(next) {
//   // @ts-ignore
//   const hashPassword = hashSync(this.password, process.env.APP_SECRET as string);
//   console.log('hashed password', hashPassword);
//   // @ts-ignore
//   this.password = hashPassword;

//   next();
// });

const User: Model<UserInterface> = model<UserInterface>('User', UserSchema);

export { User };
