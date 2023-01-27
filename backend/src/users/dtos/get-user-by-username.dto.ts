import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class GetUserByUsernameInput {
  @Field(() => String)
  username: string;
}

@ObjectType()
export class GetUserByUsernameOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
