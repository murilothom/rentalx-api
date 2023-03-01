import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

const createCarController = new CreateCarController()

export const carsRouter = Router()

carsRouter.post('/', createCarController.handle)
