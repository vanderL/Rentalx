import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstace();

const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController };