import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { Product } from '../entities/product.entity';

@ArgsType()
export class GetProductInput {
  @Field(() => Number)
  productId: number;
}

@ObjectType()
export class GetProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
