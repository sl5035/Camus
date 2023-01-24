import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  GetUserByEmailInput,
  GetUserByEmailOutput,
} from './dtos/get-user-by-email.dto';
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationsRepository: Repository<Verification>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById({ userId }: GetUserInput): Promise<GetUserOutput> {
    try {
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (!user) {
        return {
          ok: false,
          typename: 'UserNotFoundError',
          message: `User with id: ${userId} not found`,
        };
      }

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'GetUserByIdError',
        message: error.message,
      };
    }
  }

  async getUserByEmail({
    email,
  }: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        return {
          ok: false,
          typename: 'UserNotFoundError',
          message: `User with email: ${email} not found`,
        };
      }

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'GetUserByEmailError',
        message: error.message,
      };
    }
  }

  async createAccount({
    email,
    username,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.usersRepository.findOneBy({ email });
      if (existingUser) {
        return {
          ok: false,
          typename: 'ExistingEmailError',
          message: `User with email ${email} already exists`,
        };
      }

      const user = await this.usersRepository.save(
        this.usersRepository.create({ email, username, password, role }),
      );

      await this.verificationsRepository.save(
        this.verificationsRepository.create({ user }),
      );

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        typename: 'CreateAccountError',
        message: error.message,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!user) {
        return {
          ok: false,
          typename: 'UserNotFoundError',
          message: `User with email: ${email} not found`,
        };
      }

      if (!(await this.authService.checkPassword(password, user.password))) {
        return {
          ok: false,
          typename: 'IncorrectPasswordError',
          message: 'Password incorrect',
        };
      }

      const token = this.jwtService.sign(user.id);
      if (!token) {
        return {
          ok: false,
          typename: 'NoTokenError',
          message: 'No token validated',
        };
      }

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'LoginError',
        message: error.message,
      };
    }
  }
}
