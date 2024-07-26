require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const SwaggerConfig = new DocumentBuilder()
    .setTitle('User Insights API')
    .setDescription('User Insights API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
