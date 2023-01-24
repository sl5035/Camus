import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import {
  GetUserByEmailInput,
  GetUserByEmailOutput,
} from './dtos/get-user-by-email.dto';
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //TODO: Queries
  @Query(() => GetUserOutput)
  @UseGuards(AuthGuard)
  @Role(['Any'])
  async getUser(@Args() getUserInput: GetUserInput): Promise<GetUserOutput> {
    return this.usersService.getUserById(getUserInput);
  }

  @Query(() => GetUserByEmailOutput)
  @UseGuards(AuthGuard)
  @Role(['Any'])
  async getUserByEmail(
    @Args() getUserByEmailInput: GetUserByEmailInput,
  ): Promise<GetUserByEmailOutput> {
    return this.usersService.getUserByEmail(getUserByEmailInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  @Role(['Any'])
  async myProfile(@AuthUser() owner: User) {
    return owner;
  }

  //TODO: Mutations
  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return await this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  async editProfile(
    @AuthUser() owner: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(owner.id, editProfileInput);
  }
}
