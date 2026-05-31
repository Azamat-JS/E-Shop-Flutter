import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DBURL,
      entities: [AuthEntity],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 3
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
