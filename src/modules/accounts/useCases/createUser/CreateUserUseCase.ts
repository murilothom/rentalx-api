import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDto'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = data

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}
