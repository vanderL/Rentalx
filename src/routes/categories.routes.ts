import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.get('/', (request, response) => {
  listCategoryController.handle(request, response);
});

categoriesRoutes.post('/', (request, response) => createCategoryController.handle(request, response));

categoriesRoutes.post('/import', upload.single('file'), (request, response) => importCategoryController.handle(request, response));

export { categoriesRoutes };
