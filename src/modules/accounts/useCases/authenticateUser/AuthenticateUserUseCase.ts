import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { UsersRepository } from '../../repositories/implementations/UsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!')
    }

    const token = sign({}, '61a88d60fb145e4e3cea5e39b8929cec', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}
