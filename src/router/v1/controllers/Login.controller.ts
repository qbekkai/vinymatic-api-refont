import { Request } from 'express';
import bcrypt from 'bcrypt';
import debug from 'debug';
const controllerLog = debug('node:controller')

import UserController from './User.controller';
import { ForbiddenException } from '@/exceptions/400';
import { AuthService } from '@/auth/auth.service';



class LoginController extends UserController {
  private selectLoginItem: object = { email: true, password: true }

  constructor() {
    super()
  }

  public async login(req: Request) {
    const { body: { email, password } } = req;

    const [item] = await this.transaction([
      this.getOneEntity(this.entity, { select: { role: true, ...this.selectLoginItem }, where: { email } })
    ])

    const isPasswordValid = await bcrypt.compare(password, item.password)
    if (!isPasswordValid) throw new ForbiddenException('Api:Forbidden:PasswordNotValid', null)

    return {
      token: await AuthService.getToken({
        email: item.email,
        role: item.role
      })
    }
  }
}

export default LoginController;