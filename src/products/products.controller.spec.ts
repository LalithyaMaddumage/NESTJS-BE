import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// Define a test suite for the ProductsController
describe('ProductsController', () => {
  // Declare a variable to hold an instance of the ProductsController
  let controller: ProductsController;

  // Create an empty object to act as a mock for the ProductsService
  const mockProductService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  // Setup function that runs before each test case
  beforeEach(async () => {
    // Create a testing module with the ProductsController and ProductsService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      // Override the real ProductsService with the mock version
      .overrideProvider(ProductsService)
      .useValue(mockProductService)
      // Compile the module
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test case: Check the create method of ProductsController
  it('should be create a product', () => {
    // Expected product structure
    //Call the create method of the ProductsController
    expect(
      controller.create({

        id: expect.any(Number),
        name: 'string',
        description: 'string',
        price: expect.any(Number),
      }),
       //Check if the result matches the expected product structure
    ).toEqual({

      id: expect.any(Number),
      name: 'string',
      description: 'string',
      price: 9.99,
    });
  });
});
