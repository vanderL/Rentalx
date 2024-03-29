import dayjs from 'dayjs';

import { AppError } from '@errors/AppError';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let dayJsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(2, 'day').toDate();

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository()
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalsRepository,
      dayJsProvider,
      fakeCarsRepository
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await fakeCarsRepository.create({
      name: "car",
      description: "car test",
      license_plate: "test",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental is another open to the same user', async () => {
    const car = await fakeCarsRepository.create({
      name: "car",
      description: "car test",
      license_plate: "test",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '666',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '666',
        car_id: '0000000',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '666',
        car_id: '12344',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental is another open to the same car', async () => {
    const car = await fakeCarsRepository.create({
      name: "car",
      description: "car test",
      license_plate: "test",
      daily_rate: 100,
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '4321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '0000000',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
