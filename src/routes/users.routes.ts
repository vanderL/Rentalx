import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/UseCases/createUser/CreateUserController';

const createUserController = new CreateUserController();

const usersRouter = Router();

usersRouter.post('/', createUserController.handle);

export { usersRouter };
