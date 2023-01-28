import { Inject, Injectable } from '@nestjs/common';
import { JwtSignOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly jwtSignOptions: JwtSignOptions,
  ) {}

  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.jwtSignOptions.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.jwtSignOptions.privateKey);
  }
}
