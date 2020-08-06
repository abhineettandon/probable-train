import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local';
import { compareSync } from 'bcrypt';

import { User } from '../../app/Models/User';

const options: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}

export default new LocalStrategy(options, async (email, password, done)  => {

  const user = await User.findOne({ email });

  if (!user) {
    return done(null, false, { message: 'User not found.' });
  }

  if (!compareSync(password, user.password)) {
    return done(null, false, { message: 'Login credentials error' });
  }

  user.lastLogin = new Date(Date.now());
  await user.save();

  return done(null, user, { message: 'User found' });
});
