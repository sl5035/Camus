import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Universities } from 'src/common/common.enums';
import { Product } from 'src/products/entities/product.entity';

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(Universities, { name: 'Universities' });

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

  @Column({ type: 'enum', enum: Universities })
  @Field(() => Universities)
  @IsEnum(Universities)
  university: Universities;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  verified: boolean;

  @OneToMany(() => Product, (product) => product.owner)
  @Field(() => [Product])
  products: Product[];

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
