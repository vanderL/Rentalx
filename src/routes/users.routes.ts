import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '../modules/accounts/UseCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController';

const upload = multer({
  dest: './avatar',
});

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouter = Router();

usersRouter.post('/', createUserController.handle);

usersRouter.patch('/', upload.single('file'), updateUserAvatarController.handle);

export { usersRouter };
