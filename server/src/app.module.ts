import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/entities/auth.entity';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DBURL'),
        entities: [AuthEntity],
        synchronize: true,
        autoLoadEntities: true,
        retryAttempts: 3
      }),
    }),
    AuthModule,
    ProductModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
