import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/UseCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserControoler = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserControoler.handle);

export { authenticateRoutes };
