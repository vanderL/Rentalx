import { AppError } from '@errors/AppError';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepositor: FakeRentalsRepository;

describe('Create Rental', () => {
  beforeEach(() => {
    fakeRentalsRepositor = new FakeRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(fakeRentalsRepositor);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '12121212',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '12121212',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '0000000',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '0000000',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '4321',
        car_id: '0000000',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
