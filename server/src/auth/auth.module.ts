import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ImageKitService } from 'src/utils/imagekit.service';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { RatingEntity } from 'src/product/entities/ratings.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([AuthEntity, RatingEntity]),
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
  controllers: [AuthController],
  providers: [AuthService, ImageKitService, JwtStrategy],
})
export class AuthModule { }
