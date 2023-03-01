import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Description Test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand Test',
      category_id: 'category',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with an existing license plate', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1 Test',
        description: 'Description Test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand Test',
        category_id: 'category',
      })

      await createCarUseCase.execute({
        name: 'Car2 Test',
        description: 'Description Test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand Test',
        category_id: 'category',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new car with availability', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Description Test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand Test',
      category_id: 'category',
    })

    expect(car.available).toBe(true)
  })
})
