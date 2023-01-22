import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class GetUserInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class GetUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
