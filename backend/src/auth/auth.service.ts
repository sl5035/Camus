import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, userPassword);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
