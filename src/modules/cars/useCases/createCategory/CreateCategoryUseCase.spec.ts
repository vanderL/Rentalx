import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryFake } from '../../repositories/fakes/FakeCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryFake: CategoriesRepositoryFake;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake);
  });

  it('shoul be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryFake.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('shoul not be able to create a new category with name duplicated ', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })).rejects.toBeInstanceOf(AppError);
  });
});
