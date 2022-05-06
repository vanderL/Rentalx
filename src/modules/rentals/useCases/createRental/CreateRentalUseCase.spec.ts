import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('Create Rental', () => {
  let createRentalUseCase: CreateRentalUseCase;
  beforeEach(() => {
    createRentalUseCase = new CreateRentalUseCase();
  });

  it('Should be able to create a new rental', async () => {
    await createRentalUseCase.execute();
  });
});
