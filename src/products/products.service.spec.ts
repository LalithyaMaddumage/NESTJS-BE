import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository ={};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService , 
        {
        provide : getRepositoryToken(Product),
        useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
