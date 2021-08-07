import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: ['https://n12-assessment-frontend.herokuapp.com', 'http://localhost', /http:\/\/localhost:[0-9]+$/] });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
