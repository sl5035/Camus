import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Column()
  @Field(() => Number)
  @IsNumber()
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  sold: boolean;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  @Field(() => User)
  owner: User;

  // TODO: Categories
}
