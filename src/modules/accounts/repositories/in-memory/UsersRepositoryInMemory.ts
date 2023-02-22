import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDto'
import { User } from '@modules/accounts/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    const { driver_license, email, name, password } = data

    const user = new User()

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    return user
  }
}
