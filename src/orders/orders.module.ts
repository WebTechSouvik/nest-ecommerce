import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ShippingInfo } from './entities/shipping-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, ShippingInfo])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
