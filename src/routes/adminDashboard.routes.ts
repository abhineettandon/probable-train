import { Router } from 'express';

import { AdminDashboardController } from '../app/Controllers'

const adminDashboard: Router = Router();

adminDashboard.get('/', AdminDashboardController.stats);

export default adminDashboard;
