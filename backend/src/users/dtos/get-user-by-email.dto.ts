import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class GetUserByEmailInput {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class GetUserByEmailOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
