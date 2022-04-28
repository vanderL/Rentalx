import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarsUseCase = new ListCarsUseCase(fakeCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Car Brand',
      category_id: '10eb9c99-53c0-4ea2-bf57-406532590146',
      daily_rate: 140,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'xxxx',
      name: 'Car1',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Car Brand test',
      category_id: '10eb9c99-53c0-4ea2-bf57-406532590146',
      daily_rate: 140,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'xxxx',
      name: 'Car1',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car Brand test',
    });

    expect(cars).toEqual([car]);
  });
});
