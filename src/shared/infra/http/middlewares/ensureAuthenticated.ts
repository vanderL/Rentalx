import {
  NextFunction, request, Request, Response,
} from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

    // const usersRepository = new UsersRepository();

    const user = usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
