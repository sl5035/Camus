import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

import * as Joi from 'joi';
import { Verification } from './users/entities/verification.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError(error: GraphQLError) {
        const graphQlFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };

        return graphQlFormattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: false,
      entities: [User, Verification],
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    JwtModule.forRoot({
      privateKey: process.env.JWT_PRIVATE_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
