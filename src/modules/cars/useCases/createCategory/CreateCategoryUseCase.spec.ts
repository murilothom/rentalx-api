import { AppError } from '@errors/AppError'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const newCategory = {
      name: 'Category test',
      description: 'Description test',
    }
    await createCategoryUseCase.execute(newCategory)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      newCategory.name
    )

    expect(createdCategory).toHaveProperty('id')
  })

  it('should not be able to create a new category with a name already created', async () => {
    await expect(async () => {
      const newCategory = {
        name: 'Category test',
        description: 'Description test',
      }
      await createCategoryUseCase.execute(newCategory)

      await createCategoryUseCase.execute(newCategory)
    }).rejects.toBeInstanceOf(AppError)
  })
})
