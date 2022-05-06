import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AppError } from '@errors/AppError';
import { Rental } from '@modules/rentals/infra/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const compareMinHours = 24;
    // O aluguel deve ter duração mínima de 24 horas.
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');

    if (compare < compareMinHours) {
      throw new AppError('Invalid return time!');
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
