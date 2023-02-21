import { ICreateUserDTO } from '../dtos/ICreateUserDto'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
}
