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
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: '1234566',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name Car',
    });
  });
});
