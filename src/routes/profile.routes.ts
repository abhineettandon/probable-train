import { Router } from 'express';

import { ProfileController } from '../app/Controllers/ProfileController';

const profile: Router = Router();

profile.post('/change-password', ProfileController.changePassword);

export default profile;