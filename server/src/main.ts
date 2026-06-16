import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));
  const port = process.env.PORT || 4006;
  await app.listen(port ?? 3000, '0.0.0.0', () => {
    console.log(`Server is runnning on ${port}`);
  });
}
bootstrap();
