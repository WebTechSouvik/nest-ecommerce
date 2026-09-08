import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import databaseConfig from './config/database.config';
import validationSchema from './config/env.validation';
import jwtConfig from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommonModule } from './common/common.module';
import awsConfig from './config/aws.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig, jwtConfig, awsConfig],
    validate: (env) => validationSchema.parse(env)
  }), DatabaseModule, UsersModule, CartsModule, OrdersModule, ProductsModule, AuthModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: "APP_INTERCEPTOR",
    useClass: ResponseInterceptor
  }],
})
export class AppModule { }
