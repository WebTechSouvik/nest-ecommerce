import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import validationSchema from './config/env.validation';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig],
    validate: (env) => validationSchema.parse(env)
  }), DatabaseModule, UsersModule, CartsModule, OrdersModule, ProductsModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService, {
    provide: "APP_INTERCEPTOR",
    useClass: ResponseInterceptor
  }],
})
export class AppModule { }
