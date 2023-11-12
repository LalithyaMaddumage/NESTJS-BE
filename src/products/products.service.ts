import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    private readonly entityManager:EntityManager) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto)
    await this.entityManager.save(product)
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({where:{id}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
