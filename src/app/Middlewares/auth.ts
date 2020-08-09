import { authenticate } from 'passport';

import { Request, Response, NextFunction } from 'express';

import { UserInterface } from '../../types/UserInterface';

export default function Auth(req: Request, res: Response, next: NextFunction) {
  return authenticate('jwt', { session: false }, (err, payload: UserInterface) => {
    if (err) {
      return res.status(500).json({ error: { message: 'Something went wrong' } });
    }

    if (!payload) {
      return res.status(401).json({ error: { message: 'Invalid Token. Access Denied!' } });
    }

    req.user = payload;

    return next();

  })(req, res, next)
}
