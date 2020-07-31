import { Request, Response, Router } from 'express';

const auth: Router = Router();

auth.post('/login', (req: Request, res: Response) => {
  return res.json(req.body);
});

export default auth;
