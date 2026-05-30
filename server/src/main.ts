import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT || 4005;
  await app.listen(port ?? 3000, '0.0.0.0', () => {
    console.log(`Server is runnning on ${port}`);
  });
}
bootstrap();
