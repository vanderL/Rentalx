import { Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.get('/', (request, response) => response.json(categories));

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
  });

  categories.push(category);

  return response.status(201).send();
});

export { categoriesRoutes };
