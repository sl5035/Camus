import { Query, Resolver } from '@nestjs/graphql';
import { GetProductOutput } from './dtos/get-product.dto';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  //   @Query(() => GetProductOutput)
  //   async getProduct() {}
}
