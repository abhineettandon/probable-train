import { Router } from 'express';

import { AuthController } from '../app/Controllers';

const auth: Router = Router();

auth.post('/register', AuthController.regsiter);
auth.post('/login', AuthController.login);

export default auth;
