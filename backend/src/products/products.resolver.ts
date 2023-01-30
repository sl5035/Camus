import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { GetProductInput, GetProductOutput } from './dtos/get-product.dto';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // Queries
  @Query(() => GetProductOutput)
  @UseGuards(AuthGuard)
  @Role(['Admin'])
  async getProduct(
    @Args() getProductInput: GetProductInput,
  ): Promise<GetProductOutput> {
    return this.productsService.getProductById(getProductInput);
  }

  // Mutations
  @Mutation(() => CreateProductOutput)
  @UseGuards(AuthGuard)
  @Role(['Any'])
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
    @AuthUser() owner: User,
  ): Promise<CreateProductOutput> {
    return this.productsService.createProduct(createProductInput, owner);
  }
}
