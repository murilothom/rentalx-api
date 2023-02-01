import { Router } from 'express'

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req, res) =>
  createCategoryController.handle(req, res)
)

categoriesRoutes.get('/', (req, res) => {
  const allCategories = categoriesRepository.list()

  return res.json(allCategories)
})
