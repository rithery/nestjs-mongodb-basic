import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService, // Inject the ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productResult = await this.productsService.findOne(
      createOrderDto.productId,
    );

    if (!productResult) {
      throw new NotFoundException('product not found');
    }

    const result = new this.orderModel(createOrderDto);
    return result.save();
  }

  async findOne(id: string): Promise<Order> {
    const order = this.orderModel.findById(id).populate('productId').exec();
    return order;
  }
}