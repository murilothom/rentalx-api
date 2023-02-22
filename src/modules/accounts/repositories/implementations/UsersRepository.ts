import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDto'
import { User } from '@modules/accounts/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license, id, avatar } = data

    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar,
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }
}
