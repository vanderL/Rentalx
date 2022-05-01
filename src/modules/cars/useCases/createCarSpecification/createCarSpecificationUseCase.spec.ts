import { AppError } from '@errors/AppError';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(fakeCarsRepository);
  });
  it('Should be able to add a new specification to the car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specifications_id = ['54321'];
    await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
  });

  it('Should be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '12345';
      const specifications_id = ['54321'];
      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
