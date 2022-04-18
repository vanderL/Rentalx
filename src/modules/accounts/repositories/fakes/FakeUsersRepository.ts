import { User } from '../../entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  public async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { FakeUsersRepository };
