import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  GetUserByEmailInput,
  GetUserByEmailOutput,
} from './dtos/get-user-by-email.dto';
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => GetUserOutput)
  async getUser(@Args() getUserInput: GetUserInput): Promise<GetUserOutput> {
    return this.usersService.getUserById(getUserInput);
  }

  @Query(() => GetUserByEmailOutput)
  async getUserByEmail(
    @Args() getUserByEmailInput: GetUserByEmailInput,
  ): Promise<GetUserByEmailOutput> {
    return this.usersService.getUserByEmail(getUserByEmailInput);
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return await this.usersService.createAccount(createAccountInput);
  }
}
