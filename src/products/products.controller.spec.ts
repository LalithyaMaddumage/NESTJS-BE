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

    // Mock the update method of the ProductsService
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),

    // Mock the findAll method of the ProductsService
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'Product1',
          description: 'Description1',
          price: 19.99,
        },
        {
          id: 2,
          name: 'Product2',
          description: 'Description2',
          price: 29.99,
        },
      ];
    }),

   // Mock the findOne method of the ProductsService
    findOne: jest.fn((id) => {
      return {
        id,
        name: 'Product' + id,
        description: 'Description' + id,
        price: 19.99 + id,
      };
    }),

    remove :jest.fn((id) => {
      // Assume your remove method returns some information about the removed product
      return {
        message: `Product with id ${id} removed successfully`,
      };

    })
    

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


  // Test case: Check the update method of ProductsController
it('should update a product', () => {
  // Expected product structure after update
  expect(
    controller.update('1', {
      name: 'updatedName',
      description: 'updatedDescription',
      price: expect.any(Number),
    }),
  ).toEqual({
    id:1,
    name: 'updatedName',
    description: 'updatedDescription',
    price: 19.99,
  });
});

// Test case: Check the findAll method of ProductsController
it('should get all products', () => {
  expect(controller.findAll()).toEqual([
    {
      id: 1,
      name: 'Product1',
      description: 'Description1',
      price: 19.99,
    },
    {
      id: 2,
      name: 'Product2',
      description: 'Description2',
      price: 29.99,
    },
  ]);
});


// Test case: Check the findOne method of ProductsController
it('should get one product by id', () => {
  expect(controller.findOne('1')).toEqual({
    id: 1,
    name: 'Product1',
    description: 'Description1',
    price: expect.any(Number), // Allow any number for the price
  });
});


// Test case: Check the remove method of ProductsController
it('should remove a product by id', () => {
  const productId = '1';

  expect(controller.remove(productId)).toEqual({
    message: `Product with id ${productId} removed successfully`,
  });
});

});
