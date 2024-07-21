import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  getOrderById(@Param('id') orderId: string) {
    return this.ordersService.findOne(orderId);
  }
}