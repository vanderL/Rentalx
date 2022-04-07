import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/UseCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController';

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouter = Router();

usersRouter.post('/', createUserController.handle);

usersRouter.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRouter };
