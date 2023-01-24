import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Verification]), AuthModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
