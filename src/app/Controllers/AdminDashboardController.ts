import { Request, Response } from  'express';
import { User } from '../Models/User';
import { RolesEnum } from '../../types/RolesEnum';

export class AdminDashboardController {
  static stats = async (req: Request, res: Response): Promise<Response> => {
    const usersCount = await User.count({ role: RolesEnum.USER });
    
    return res.json({ data: {
      stats: {
        usersCount,
      }
    }});
  }
}
