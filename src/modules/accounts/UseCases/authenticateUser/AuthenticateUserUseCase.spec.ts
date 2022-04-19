import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/repositories/dtos/ICreateUserDTO';
import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/UseCases/createUser/CreateUserUseCase';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '100123',
      email: 'vnd.vander@gmail.com',
      name: 'vander',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fake@falso.com',
        password: '12333',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '100123',
      email: 'vnd.vander@gmail.com',
      name: 'vander',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    expect(authenticateUserUseCase.execute({
      email: user.email,
      password: '123455',
    })).rejects.toBeInstanceOf(AppError);
  });
});
