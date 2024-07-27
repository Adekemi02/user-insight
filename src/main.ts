require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(new ValidationPipe())
  
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('User Insights API')
    .setDescription('User Insights API')
    .setVersion('1.0')
    .build();

    app.enableCors({
      origin: ['http://localhost:3000'], 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
      preflightContinue: false
    });

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
