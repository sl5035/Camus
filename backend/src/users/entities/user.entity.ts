import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  username: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  verified: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      const saltRounds = 15;
      const salt = await bcrypt.genSalt(saltRounds);

      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
