import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrderSchema } from 'src/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ProductsModule, // Import the ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}