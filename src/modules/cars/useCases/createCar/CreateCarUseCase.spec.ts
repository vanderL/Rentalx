import { AppError } from '@errors/AppError';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: FakeCarsRepository;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: '1234566',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name Car',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand1',
        category_id: '12345661',
        daily_rate: 100,
        description: 'Description Car1',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name Car1',
      });

      await createCarUseCase.execute({
        brand: 'Brand1',
        category_id: '12345661',
        daily_rate: 100,
        description: 'Description Car1',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name Car1',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shoul be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand2',
      category_id: '123456621',
      daily_rate: 100,
      description: 'Description Car2',
      fine_amount: 60,
      license_plate: 'ABC-4321',
      name: 'Name Car2',
    });

    expect(car.available).toBe(true);
  });
});
