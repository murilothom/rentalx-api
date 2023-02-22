import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDto'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123000',
      email: 'test@email.com',
      name: 'Jon Doe',
      password: '123456',
    }

    await createUserUseCase.execute(user)

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'invalid@email.com',
        password: 'invalid_pass',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an invalid password', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123000',
        email: 'test@email.com',
        name: 'Jon Doe',
        password: '123456',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid_pass',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an invalid email', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123000',
        email: 'test@email.com',
        name: 'Jon Doe',
        password: '123456',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: 'invalid@email.com',
        password: user.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
