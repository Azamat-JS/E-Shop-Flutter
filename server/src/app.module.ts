import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DBUSERNAME,
      database: process.env.DBNAME,
      host: process.env.DBHOST,
      password: process.env.DBPASSWORD,
      port: Number(process.env.DBPORT),
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 3
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
