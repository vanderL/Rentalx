import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvaiblableCarsUseCase: ListAvailableCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvaiblableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
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

    const cars = await listAvaiblableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Car Brand test',
      category_id: '10eb9c99-53c0-4ea2-bf57-406532590146',
      daily_rate: 140,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'xxxx',
      name: 'Car1',
    });

    const cars = await listAvaiblableCarsUseCase.execute({
      brand: 'Car Brand test',
    });

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
      name: 'Car2',
    });

    const cars = await listAvaiblableCarsUseCase.execute({
      name: 'Car2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Car Brand test',
      category_id: '10eb9c99-53c0-4ea2-bf57-406532590146',
      daily_rate: 140,
      description: 'Car description',
      fine_amount: 100,
      license_plate: 'xxxx',
      name: 'Car4',
    });

    const cars = await listAvaiblableCarsUseCase.execute({
      category_id: '10eb9c99-53c0-4ea2-bf57-406532590146',
    });

    expect(cars).toEqual([car]);
  });
});
