import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Universities } from 'src/common/common.enums';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class GetUsersByUnivsInput {
  @Field(() => Universities)
  university: Universities;
}

@ObjectType()
export class GetUsersByUnivsOutput extends CoreOutput {
  @Field(() => [User], { nullable: true })
  users?: User[];
}
