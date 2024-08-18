import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from './product.dto';
import { UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    if (products. === 0) {
      return this.getDummyProducts();
    }
    return products;
  }

  private getDummyProducts(): Product[] {
    return [
      {
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 10,
      },
      {
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 20,
      },
      {
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 30,
      },
      {
        name: 'Product 4',
        description: 'Description for Product 4',
        price: 40,
      },
      {
        name: 'Product 5',
        description: 'Description for Product 5',
        price: 50,
      },
    ] as Product[];
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!resul) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      // Handle or transform the error as needed
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
