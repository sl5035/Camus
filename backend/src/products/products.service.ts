import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { GetProductInput, GetProductOutput } from './dtos/get-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getProductById({
    productId,
  }: GetProductInput): Promise<GetProductOutput> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
        relations: ['owner'],
      });
      if (!product) {
        return {
          ok: false,
          typename: 'ProductNotFoundError',
          message: `Product with id: ${productId} not found`,
        };
      }

      return {
        ok: true,
        product,
      };
    } catch (error) {
      return {
        ok: false,
        typename: 'GetProductError',
        message: error.message,
      };
    }
  }

  async createProduct(
    { name, description, price }: CreateProductInput,
    owner: User,
  ): Promise<CreateProductOutput> {
    try {
      await this.productsRepository.save(
        this.productsRepository.create({
          name,
          description,
          price,
          owner,
        }),
      );

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        typename: 'CreateProductError',
        message: error.message,
      };
    }
  }
}
