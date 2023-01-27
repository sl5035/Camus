import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

import * as bcrypt from 'bcrypt';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import {
  GetUserByUsernameInput,
  GetUserByUsernameOutput,
} from './dtos/get-user-by-username.dto';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationsRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

  async getUserByUsername({
    username,
  }: GetUserByUsernameInput): Promise<GetUserByUsernameOutput> {
    try {
      const user = await this.usersRepository.findOneBy({ username });
      if (!user) {
        return {
          ok: false,
          typename: 'UserNotFoundError',
          message: `User with username: ${username} not found`,
        };
      }

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'GetUserByUsernameError',
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

      const verification = await this.verificationsRepository.save(
        this.verificationsRepository.create({ user }),
      );

      this.emailService.sendVerificationEmail(user.username, verification.code);

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        typename: 'CreateAccountError',
        message: error.message,
      };
    }
  }

  private async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, userPassword);
    } catch (error) {
      throw new InternalServerErrorException();
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

      if (!(await this.checkPassword(password, user.password))) {
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

  async editProfile(
    userId: number,
    { username, password, role }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.usersRepository.findOneBy({ id: userId });

      if (username) {
        user.username = username;
      }
      if (password) {
        user.password = password;
      }
      if (role) {
        user.role = role;
      }

      await this.usersRepository.save(user);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'EditProfileError',
        message: error.message,
      };
    }
  }

  async verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationsRepository.findOne({
        where: { code },
        relations: ['user'],
      });
      if (verification) {
        verification.user.verified = true;

        await this.usersRepository.save(verification.user);

        await this.verificationsRepository.delete(verification.id);

        return { ok: true };
      }

      return {
        ok: false,
        typename: 'VerificationNotFoundError',
        message: 'Verification not found',
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'VerifyEmailError',
        message: error.message,
      };
    }
  }
}
