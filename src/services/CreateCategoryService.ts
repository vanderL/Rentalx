import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
/**
 * [x] - Definir o tipo de retorno
 * [x] - Alter o retorno de erro
 * [x] - Acessar o repositorio
 */
class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {

  }

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category Already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
