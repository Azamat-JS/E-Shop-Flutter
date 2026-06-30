import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductEntity } from 'src/product/entities/product.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([ProductEntity, AuthEntity, OrderEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
